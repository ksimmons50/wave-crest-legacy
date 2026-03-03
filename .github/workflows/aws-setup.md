# AWS GitHub Actions OIDC Setup Guide

This guide explains how to set up AWS credentials for GitHub Actions using OIDC (OpenID Connect).

## Prerequisites

- AWS Account with permissions to create IAM roles
- GitHub repository where you want to run the workflow

## Step 1: Create GitHub OIDC Provider in AWS

First, check if the GitHub OIDC provider already exists:

```bash
aws iam list-open-id-connect-providers | grep github
```

If not found, create it:

```bash
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
```

## Step 2: Create IAM Role for GitHub Actions

Create a trust policy file `github-actions-trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:YOUR_GITHUB_ORG/*:*"
        }
      }
    }
  ]
}
```

Replace:
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `YOUR_GITHUB_ORG` with your GitHub organization or username

Note: The wildcard `repo:YOUR_GITHUB_ORG/*:*` allows all repositories in your organization to use this role. If you want to restrict to specific repositories, use `repo:YOUR_GITHUB_ORG/specific-repo:*` instead.

Create the role:

```bash
aws iam create-role \
  --role-name BreezyGitHubActionsRole \
  --assume-role-policy-document file://github-actions-trust-policy.json
```

## Step 3: Attach Required Permissions

Create a policy file `ecr-github-actions-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AttachVolume",
        "ec2:AuthorizeSecurityGroupIngress",
        "ec2:CopyImage",
        "ec2:CreateImage",
        "ec2:CreateKeypair",
        "ec2:CreateSecurityGroup",
        "ec2:CreateSnapshot",
        "ec2:CreateTags",
        "ec2:CreateVolume",
        "ec2:DeleteKeyPair",
        "ec2:DeleteSecurityGroup",
        "ec2:DeleteSnapshot",
        "ec2:DeleteVolume",
        "ec2:DeregisterImage",
        "ec2:DescribeImageAttribute",
        "ec2:DescribeImages",
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeRegions",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeSnapshots",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeVolumes",
        "ec2:DetachVolume",
        "ec2:GetPasswordData",
        "ec2:ModifyImageAttribute",
        "ec2:ModifyInstanceAttribute",
        "ec2:ModifySnapshotAttribute",
        "ec2:RegisterImage",
        "ec2:RunInstances",
        "ec2:StopInstances",
        "ec2:TerminateInstances"
      ],
      "Resource": "*"
    }
  ]
}
```

Create and attach the policy:

```bash
# Create the policy
aws iam create-policy \
  --policy-name ECRGitHubActionsPolicy \
  --policy-document file://ecr-github-actions-policy.json

# Attach it to the role
aws iam attach-role-policy \
  --role-name BreezyGitHubActionsRole \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/ECRGitHubActionsPolicy
```

Or if you want to use AWS managed policies for ECR access:

```bash
aws iam attach-role-policy \
  --role-name BreezyGitHubActionsRole \
  --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser
```

## Step 4: Add the Role ARN to GitHub Secrets

1. Get the role ARN:
   ```bash
   aws iam get-role --role-name BreezyGitHubActionsRole --query 'Role.Arn' --output text
   ```

2. Go to your GitHub repository settings (or organization settings for organization-wide access)
3. Navigate to Settings → Secrets and variables → Actions
4. Click "New repository secret" (or "New organization secret")
5. Name: `AWS_ROLE_TO_ASSUME`
6. Value: The ARN from step 1 (e.g., `arn:aws:iam::310275203000:role/BreezyGitHubActionsRole`)

Note: The AWS region is hard-coded to `us-east-1` by default in the workflow, but can be overridden via workflow_dispatch input or repository variables if needed.

## Step 5: Test the Setup

Push a change to trigger the workflow, or manually trigger it from the Actions tab.

## Troubleshooting

If you still get authentication errors:

1. Verify the OIDC provider exists:
   ```bash
   aws iam get-open-id-connect-provider \
     --open-id-connect-provider-arn arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com
   ```

2. Check the trust policy conditions match your repository:
   ```bash
   aws iam get-role --role-name BreezyGitHubActionsRole
   ```

3. Ensure the `AWS_ROLE_ARN` secret is set correctly in GitHub

4. Check CloudTrail for AssumeRoleWithWebIdentity errors for more details

## Alternative: Using Access Keys (Less Secure)

If OIDC setup is not possible, you can use traditional access keys:

1. Create an IAM user with the required permissions
2. Generate access keys
3. Add these secrets to GitHub:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
4. Update the workflow:

```yaml
- name: Configure AWS credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    aws-region: us-east-1
```

**Note**: OIDC is more secure as it doesn't require storing long-lived credentials.
