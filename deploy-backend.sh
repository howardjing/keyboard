#!/bin/bash

# deploy backend application

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ANSIBLE_DIR=$DIR/deploy
CODE_DIR=$DIR/backend

# get backend version from mix file
MIX_PATH=$CODE_DIR/mix.exs
# TODO: less hacky way of doing this? -- first gets the line with version, then looks for digits
KEEB_VERSION=$(grep version backend/mix.exs | grep -o '[[:digit:]].*[[:digit:]]')

# build release tarball -- assumes source and server use the same os
cd $CODE_DIR && rm -rf backend/_build/prod && MIX_ENV=prod mix release --env=prod

ansible-playbook -i $ANSIBLE_DIR/hosts $ANSIBLE_DIR/backend.yml --extra-vars "backend_version=$KEEB_VERSION"
