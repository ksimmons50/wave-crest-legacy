#!/bin/bash

# Build and push consolidated Next.js application to Amazon ECR
# Usage: ./scripts/build-and-push.sh [region] [account-id] [tag]

set -e

# Default values
REGION=${1:-us-east-1}
ACCOUNT_ID=${2:-$(aws sts get-caller-identity --query Account --output text)}
TAG=${3:-latest}
REPOSITORY_NAME=${REPOSITORY_NAME:-$(basename "$(git rev-parse --show-toplevel)")}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and pushing consolidated Next.js application to ECR...${NC}"
echo "Region: $REGION"
echo "Account ID: $ACCOUNT_ID"
echo "Repository: $REPOSITORY_NAME"
echo "Tag: $TAG"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}Docker is not running. Please start Docker first.${NC}"
    exit 1
fi

# Get ECR login token and login to Docker
echo -e "${YELLOW}Logging into ECR...${NC}"
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Create ECR repository if it doesn't exist
echo -e "${YELLOW}Creating ECR repository if it doesn't exist...${NC}"
aws ecr describe-repositories --repository-names $REPOSITORY_NAME --region $REGION &> /dev/null || \
aws ecr create-repository --repository-name $REPOSITORY_NAME --region $REGION --image-scanning-configuration scanOnPush=true

# Build the Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build --platform linux/amd64 -t $REPOSITORY_NAME:$TAG .

# Tag the image for ECR
ECR_URI=$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPOSITORY_NAME:$TAG
docker tag $REPOSITORY_NAME:$TAG $ECR_URI

# Push the image to ECR
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_URI

echo -e "${GREEN}Successfully pushed application to ECR!${NC}"
echo "Image URI: $ECR_URI"
echo ""
echo "To run this image:"
echo "docker run -p 3007:3007 $ECR_URI"
