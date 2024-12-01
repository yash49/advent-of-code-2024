#!/bin/bash

usage() {
    echo "Usage: $0 <problem_number>"
    echo "Example: $0 1a"
    exit 1
}

if [ $# -ne 1 ]; then
    usage
fi

PROBLEM_NUMBER=$1

npx tsx ./src/$PROBLEM_NUMBER.ts