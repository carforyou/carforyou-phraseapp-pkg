#!/usr/bin/env bash

set -e
npm run build

chmod +x pkg/index.js
./pkg/index.js validate
./pkg/index.js sort
CIRCLE_BRANCH=master ./pkg/index.js push
