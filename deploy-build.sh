#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
TIMESTAMP=$(date "+%Y.%m.%d-%H.%M.%S")


if [[ -d "../lamasiaevents" ]]; then
    rm -r ../lamasiaevents/*
fi

cp -r ./backend/* ../lamasiaevents/

if [[ -d "../lamasiaevents/node_modules" ]]; then
    rm -r ../lamasiaevents/node_modules
fi

if [[ -f "../lamasiaevents/package-lock.json" ]]; then
    rm ../lamasiaevents/package-lock.json
fi

cd ../lamasiaevents && git add .

if [[ -n $(git status -s) ]]; then
    git commit -m "build updated $TIMESTAMP" && git push heroku master && \
    echo -e "${GREEN}Build update and deploy completed${NC}"
else
    echo -e "${RED}No changes to commit on Heroku branch${NC}"
fi