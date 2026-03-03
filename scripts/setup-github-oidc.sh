#!/bin/bash

# GitHub OIDC Setup Script for AWS
# This script creates/updates an OIDC identity provider and IAM role for GitHub Actions
# Can be run multiple times safely - will create or update resources as needed

set -e

# Configuration - UPDATE THESE VALUES
GITHUB_ORG="breezy-sites"
GITHUB_REPO="breezy_sites_base"
ROLE_NAME="GitHubActionsRole"
AWS_REGION="us-east-1"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up GitHub OIDC with AWS...${NC}"

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &>/dev/null; then
    echo -e "${RED}❌ AWS CLI not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Check if GitHub CLI is configured
if ! gh auth status &>/dev/null; then
    echo -e "${RED}❌ GitHub CLI not authenticated. Please run 'gh auth login' first.${NC}"
    exit 1
fi

# Get AWS account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account ID: $AWS_ACCOUNT_ID${NC}"

# Create OIDC identity provider (if it doesn't exist)
echo -e "${YELLOW}🔧 Creating GitHub OIDC identity provider...${NC}"
aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1 \
    --thumbprint-list 1c58a3a8518e8759bf075b76b750d4f2df264fcd 2>/dev/null || echo -e "${YELLOW}⚠️  OIDC provider might already exist${NC}"

# Create trust policy document
echo -e "${YELLOW}📝 Creating trust policy...${NC}"
cat > /tmp/trust-policy.json << EOL
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:${GITHUB_ORG}/${GITHUB_REPO}:*"
        }
      }
    }
  ]
}
EOL

# Create IAM role
echo -e "${YELLOW}🔧 Creating IAM role: $ROLE_NAME${NC}"
aws iam create-role \
    --role-name $ROLE_NAME \
    --assume-role-policy-document file:///tmp/trust-policy.json \
    --description "Role for GitHub Actions OIDC" || echo -e "${YELLOW}⚠️  Role might already exist${NC}"

# Create permissions policy (customize based on your needs)
echo -e "${YELLOW}📝 Creating permissions policy...${NC}"
cat > /tmp/permissions-policy.json << EOL
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage",
        "ecr:DescribeRepositories",
        "ecr:CreateRepository",
        "ecr:DescribeImages",
        "ecr:ListImages"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ecs:UpdateService",
        "ecs:DescribeServices",
        "ecs:DescribeTaskDefinition",
        "ecs:RegisterTaskDefinition"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOL

# Create or update the policy
POLICY_NAME="${ROLE_NAME}Policy"
POLICY_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:policy/${POLICY_NAME}"

echo -e "${YELLOW}🔧 Creating or updating policy: $POLICY_NAME${NC}"

# Check if policy exists
if aws iam get-policy --policy-arn $POLICY_ARN &>/dev/null; then
    echo -e "${YELLOW}📝 Policy exists, creating new version...${NC}"
    aws iam create-policy-version \
        --policy-arn $POLICY_ARN \
        --policy-document file:///tmp/permissions-policy.json \
        --set-as-default
    echo -e "${GREEN}✅ Policy updated to new version${NC}"
else
    echo -e "${YELLOW}📝 Creating new policy...${NC}"
    aws iam create-policy \
        --policy-name $POLICY_NAME \
        --policy-document file:///tmp/permissions-policy.json \
        --query 'Policy.Arn' --output text
    echo -e "${GREEN}✅ Policy created${NC}"
fi

# Attach policy to role (safe to run multiple times)
echo -e "${YELLOW}🔗 Attaching policy to role...${NC}"
aws iam attach-role-policy \
    --role-name $ROLE_NAME \
    --policy-arn $POLICY_ARN 2>/dev/null || echo -e "${YELLOW}⚠️  Policy already attached${NC}"

# Get the role ARN
ROLE_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:role/${ROLE_NAME}"
echo -e "${GREEN}✅ Role ARN: $ROLE_ARN${NC}"

# Update GitHub secrets using gh CLI
echo -e "${YELLOW}🔧 Updating GitHub repository secrets...${NC}"
echo $ROLE_ARN | gh secret set AWS_ROLE_TO_ASSUME --repo ${GITHUB_ORG}/${GITHUB_REPO}
echo $AWS_REGION | gh secret set AWS_REGION --repo ${GITHUB_ORG}/${GITHUB_REPO}

echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}📋 Summary:${NC}"
echo -e "   Role ARN: $ROLE_ARN"
echo -e "   GitHub secrets updated: AWS_ROLE_TO_ASSUME, AWS_REGION"
echo -e "   Permissions include: S3, ECR (full), ECS, CloudWatch Logs"

# Cleanup temporary files
rm -f /tmp/trust-policy.json /tmp/permissions-policy.json

echo ""
echo -e "${BLUE}📋 What this script does:${NC}"
echo -e "✅ Creates GitHub OIDC identity provider (if needed)"
echo -e "✅ Creates/updates IAM role with trust policy"
echo -e "✅ Creates/updates IAM policy with comprehensive permissions:"
echo -e "   - S3: GetObject, PutObject, DeleteObject, ListBucket"
echo -e "   - ECR: Full permissions (describe, create, push, pull)"
echo -e "   - ECS: Service updates and task definitions"
echo -e "   - CloudWatch: Log management"
echo -e "✅ Updates GitHub repository secrets automatically"

echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "1. Your GitHub Actions workflow should use:"
echo -e "   ${YELLOW}- role-to-assume: \${{ secrets.AWS_ROLE_TO_ASSUME }}${NC}"
echo -e "   ${YELLOW}- aws-region: \${{ secrets.AWS_REGION }}${NC}"
echo -e "2. This script can be run multiple times safely to update permissions"
echo -e "3. Customize the permissions policy in this script if needed"

echo ""
echo -e "${GREEN}🎉 GitHub Actions should now have full AWS access for CI/CD!${NC}"
