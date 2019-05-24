#!/usr/bin/env bash

set -e
npx cfy-phraseapp validate
npx cfy-phraseapp sort
CIRCLE_BRANCH=master npx cfy-phraseapp push
