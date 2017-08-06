#!/bin/bash

# sets up webserver with dependencies

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ANSIBLE_DIR=$DIR/deploy

ansible-playbook -i $ANSIBLE_DIR/hosts $ANSIBLE_DIR/setup.yml
