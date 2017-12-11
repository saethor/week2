#!/bin/bash
# Set THISDIR as script's location directory
THISDIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
IMAGE_ID="ami-1a962263"

# Include functions
source ${THISDIR}/ec2-functions.sh

# Get username from aws
USERNAME=$(aws iam get-user --query 'User.UserName' --output text)

PEM_NAME=hgop-${USERNAME}
JENKINS_SECURITY_GROUP=jenkins-${USERNAME}

# Create security group
if [ ! -e ./ec2_instance/security-group-id.txt ]; then
    create-security-group ${JENKINS_SECURITY_GROUP}
else
    SECURITY_GROUP_ID=$(cat ./ec2_instance/security-group-id.txt)
fi

# Create ec2 instance
if [ ! -e ./ec2_instance/instance-id.txt ]; then
    create-ec2-instance ${IMAGE_ID} ${SECURITY_GROUP_ID} ${THISDIR}/bootstrap-jenkins.sh ${PEM_NAME}
fi

# Add authorizations for jenkins security group
authorize-access ${JENKINS_SECURITY_GROUP}

set +e
# copy init files over to instance
scp -o StrictHostKeyChecking=no -i "./ec2_instance/${PEM_NAME}.pem" ec2-user@$(cat ./ec2_instance/instance-public-name.txt):/var/log/cloud-init-output.log ./ec2_instance/cloud-init-output.log
scp -o StrictHostKeyChecking=no -i "./ec2_instance/${PEM_NAME}.pem" ec2-user@$(cat ./ec2_instance/instance-public-name.txt):/var/log/user-data.log ./ec2_instance/user-data.log

# Associate CICD profile with new instance
aws ec2 associate-iam-instance-profile --instance-id $(cat ./ec2_instance/instance-id.txt) --iam-instance-profile Name=CICDServer-Instance-Profile
