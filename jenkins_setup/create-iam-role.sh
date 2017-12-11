#!/bin/bash
# Create CI role
aws iam create-role --role-name StudentCICDServer  --assume-role-policy-document file://./cicd-access-policy.json

# Attach full access policy to CI role
ARN="arn:aws:iam::aws:policy/AmazonEC2FullAccess"
aws iam attach-role-policy --role-name StudentCICDServer --policy-arn $ARN 

# Create instance profile for CI
aws iam create-instance-profile --instance-profile-name CICDServer-Instance-Profile

# Create instance profile with CI role
aws iam add-role-to-instance-profile --role-name StudentCICDServer --instance-profile-name CICDServer-Instance-Profile