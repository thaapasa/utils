#!/usr/bin/env bash

# Generate random password

OS=`uname`

if [ "$OS" = "Darwin" ]
then
    cat /dev/urandom | base64 | head -c 32
elif [ "$OS" = "Linux" ]
then
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | head -c 32
else
    echo "Unknown OS"
fi

