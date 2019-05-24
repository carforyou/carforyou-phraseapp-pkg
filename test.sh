#!/usr/bin/env bash

set -e
npm run build
./pkg/dist-node/index.bin.js validate
./pkg/dist-node/index.bin.js sort
CIRCLE_BRANCH=master ./pkg/dist-node/index.bin.js push
