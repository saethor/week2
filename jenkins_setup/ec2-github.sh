# Setup ssh key on jenkins
ssh -i "./ec2_instance/hgop-${USERNAME}.pem" ec2-user@${INSTANCE_PUBLIC_NAME}
sudo su -s /bin/bash jenkins
cd /var/lib/jenkins/
ssh-keygen
cat .ssh/id_rsa.pub