#!/usr/bin/env bash

#
# This script runs component's visual regression test.
#
# It will run tests based on config provided:
#   --all : Runs all components tests (slower)
#   --spec <spec_file> : Runs tests for provided spec file only
#   --diff : Runs tests by detecting diff of current branch and master
#
# All tests will run if current branch is master
#

# Read and process script arguments

while [ "$1" != "" ]; do
  case $1 in
    --all ) all=1
            ;;
    --spec ) shift
            spec=$1
            ;;
    --diff ) shift
            diff=$1
            ;;
  esac
  shift
done

# Determine IP and base URL
if [[ "$OSTYPE" == "linux-gnu" ]]; then
  MY_IP=`ifconfig eth0 | awk '/inet / {print $2}' | awk -F: '{print $2}'`
elif [[ "$OSTYPE" == "darwin"* ]]; then
  MY_IP=`ipconfig getifaddr en0` # wireless network
  if [[ -z "${MY_IP}" ]]; then
    MY_IP=`ipconfig getifaddr en1` # ethernet
  fi;
elif [[ "$OSTYPE" == "msys" ]]; then # windows
  MY_IP=`ipconfig | awk '/IPv4 Address/ {print $NF}' | awk 'NR==1'`
fi;

STORYBOOK_PORT=9001
BASE_URL="http://${MY_IP}:${STORYBOOK_PORT}"

# TODO: find git diff and components to test

if [[ ! -z $spec ]]; then
  spec="$spec"
else
  if [[  $all != 1 ]]; then
    branch=$(git rev-parse --abbrev-ref HEAD)

    if [[ -z $branch ]] || [[ $branch == "master" ]]; then
      # Run all tests if master is the current branch
      all=1
    fi
  fi
fi

if [[ $all == 1 ]]; then
  echo "\n All tests will be executed"
  spec="**/*.vr-spec.ts"
fi

# Generate fixture which will contain test-data to generate tests
./node_modules/.bin/ts-node  src/utils/vr-test/load-test-data.ts ./src ./cypress

# Run test
./node_modules/.bin/cypress run -c integrationFolder=".",baseUrl="$BASE_URL" --spec="$spec" --reporter cypress-image-snapshot/reporter
# ./node_modules/.bin/cypress open -c integrationFolder="./src/app/",baseUrl="$BASE_URL" 
