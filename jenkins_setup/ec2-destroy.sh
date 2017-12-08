#!/usr/bin/env bash
# This script's directory
THISDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

INSTANCE_ID=$(cat ./ec2_instance/instance-id.txt)
SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)

# Get username from aws
USERNAME=$(aws iam get-user --query 'User.UserName' --output text)

# Include functions
. ${THISDIR}/ec2-functions.sh

# terminate instance by instance id
if [ -e "./ec2_instance/instance-id.txt" ]; then
    aws ec2 terminate-instances --instance-ids ${INSTANCE_ID}

    aws ec2 wait --region eu-west-1 instance-terminated --instance-ids ${INSTANCE_ID}

    rm ./ec2_instance/instance-id.txt
    rm ./ec2_instance/instance-public-name.txt
fi


PEM_NAME=hgop-${USERNAME}
JENKINS_SECURITY_GROUP=jenkins-${USERNAME}

# Delete security group
if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
else
    delete-security-group ${JENKINS_SECURITY_GROUP}
    rm ./ec2_instance/security-group-id.txt
fi
