#!/bin/bash


if [ -z "$GIT_COMMIT" ];
then
    export GIT_COMMIT=$(git rev-parse HEAD)
fi

if [ ! -d ~/aws ];
then
    source ./create-aws-docker-host-instance.sh
fi 

source ./update-env.sh ${INSTANCE_PUBLIC_NAME}

echo New environment provisioned