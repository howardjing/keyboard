#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ANSIBLE_DIR=$DIR/deploy
CODE_DIR=$DIR/frontend

cd $CODE_DIR && rm -rf dist-prod && yarn bundle-production
ansible-playbook -i $ANSIBLE_DIR/hosts $ANSIBLE_DIR/frontend.yml
