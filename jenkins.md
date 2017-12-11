# Day 6 (Jenkins)

## Steps taken
We had our own AWS account so we had to make the following changes to the provided scripts:

* All scripts used for the provisioning of the jenkins instance are found in the jenkins_setup directory, imported in from the day6 directory from our previous [github repository](https://github.com/saethor/hgop), where the commit history for the scripts can be examined.
* We used the provided functions and we changed paths to enable this.
* We had to manage region and image id variables to match our configurations.
* We had to add a function call to create key pair in the provision script.
* We had to re-provision jenkins instance so the proper plugins could be installed on startup.
* We had to manually add installing git to ec2 instance when we failed to install the recommended plugins on startup. When we re-provisioned jenkins, we could skip this step.
* We had to enable permissions from all sources for port 8080 to get github webhooks working properly.
* We manually edited Jenkins configurations for global, github and pipeline configurations to get github webhooks working properly.