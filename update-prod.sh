#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
TIMESTAMP=$(date "+%Y.%m.%d-%H.%M.%S")

git diff --quiet
CHANGES=$?

if [ $CHANGES -eq 1 ]; then
    if [[ -d "./frontend/build" && -d "./backend/build" ]]; then
        rm -r ./frontend/build && rm -r ./backend/build
    fi

    cd frontend && npm run build && \
    cp -r build ../backend/ && echo -e "${GREEN}Build updated${NC}" && \
    cd .. && \
    git add .

    if [[ -n $(git status -s) ]]; then
        git commit -m "build updated $TIMESTAMP" && \
        git push origin main && echo -e "${GREEN}Dev branch updated${NC}"
    else
        echo -e "${RED}No changes to commit on dev branch${NC}"
    fi

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
else
    echo -e "${RED}No changes detected. Build and deploy skipped.${NC}"
fi
