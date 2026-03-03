#!/bin/bash

# Update IAM policy for GitHub Actions role to include ECR permissions
# Usage: ./scripts/update-iam-policy.sh [role-name] [region]

set -e

# Default values
ROLE_NAME=${1:-BreezyGitHubActionsRole}
REGION=${2:-us-east-1}
POLICY_NAME="ECRAccessPolicy"
ACCOUNT_ID="310275203000"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Updating IAM policy for GitHub Actions ECR access...${NC}"
echo "Role: $ROLE_NAME"
echo "Policy: $POLICY_NAME"
echo "Account: $ACCOUNT_ID"
echo ""

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if the role exists
echo -e "${YELLOW}Checking if role exists...${NC}"
if ! aws iam get-role --role-name $ROLE_NAME &> /dev/null; then
    echo -e "${RED}Role $ROLE_NAME does not exist. Please create it first.${NC}"
    exit 1
fi

# Check if policy file exists
if [ ! -f "iam-policy.json" ]; then
    echo -e "${RED}iam-policy.json file not found in current directory.${NC}"
    exit 1
fi

# Create or update the inline policy
echo -e "${YELLOW}Applying ECR access policy to role...${NC}"
aws iam put-role-policy \
    --role-name $ROLE_NAME \
    --policy-name $POLICY_NAME \
    --policy-document file://iam-policy.json

echo -e "${GREEN}Successfully updated IAM policy!${NC}"
echo ""
echo "The role $ROLE_NAME now has the following ECR permissions:"
echo "- ecr:GetAuthorizationToken"
echo "- ecr:BatchCheckLayerAvailability"
echo "- ecr:GetDownloadUrlForLayer"
echo "- ecr:BatchGetImage"
echo "- ecr:DescribeRepositories"
echo "- ecr:CreateRepository"
echo "- ecr:InitiateLayerUpload"
echo "- ecr:UploadLayerPart"
echo "- ecr:CompleteLayerUpload"
echo "- ecr:PutImage"
echo "- ecr:DescribeImages"
echo "- ecr:DescribeImageScanFindings"
echo "- ecr:ListImages"
echo ""
echo "You can now run the GitHub Actions workflows successfully!"

# Verify the policy was applied
echo -e "${YELLOW}Verifying policy application...${NC}"
if aws iam get-role-policy --role-name $ROLE_NAME --policy-name $POLICY_NAME &> /dev/null; then
    echo -e "${GREEN}Policy verified successfully!${NC}"
else
    echo -e "${RED}Policy verification failed. Please check manually.${NC}"
    exit 1
fi
