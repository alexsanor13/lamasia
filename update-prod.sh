#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color
TIMESTAMP=$(date "+%Y.%m.%d-%H.%M.%S")
FORCE_DEPLOY=false
CUSTOM_COMMIT_MESSAGE=""

while getopts ":fm:" opt; do
  case $opt in
    f)
      FORCE_DEPLOY=true
      ;;
    m)
      CUSTOM_COMMIT_MESSAGE="$OPTARG"
      ;;
    \?)
      echo "La opción es inválida: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

git diff --quiet
CHANGES=$?

if [ $CHANGES -eq 1 ] || $FORCE_DEPLOY; then
    if [[ -d "./frontend/build" && -d "./backend/build" ]]; then
        rm -r ./frontend/build && rm -r ./backend/build
    fi

    cd frontend && NODE_ENV=production npm run build && \
    cp -r build ../backend/ && echo -e "${GREEN}Build updated${NC}" && \
    cd .. && \
    git add .

    if [[ -n $(git status -s) ]]; then
        if [ -z "$CUSTOM_COMMIT_MESSAGE" ]; then
            COMMIT_MESSAGE="build updated $TIMESTAMP"
        else
            COMMIT_MESSAGE="$CUSTOM_COMMIT_MESSAGE"
        fi

        git commit -m "$COMMIT_MESSAGE" && \
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

    if [[ -n $(git status -s) ]] || $FORCE_DEPLOY; then
        if [ -z "$CUSTOM_COMMIT_MESSAGE" ]; then
            COMMIT_MESSAGE="build updated $TIMESTAMP"
        else
            COMMIT_MESSAGE="$CUSTOM_COMMIT_MESSAGE"
        fi

        git commit -m "$COMMIT_MESSAGE" && git push origin main && \
        echo -e "${GREEN}Build update and deploy completed${NC}"
    else
        echo -e "${RED}No changes to commit on Github branch${NC}"
    fi
else
    echo -e "${RED}No changes detected. Build and deploy skipped.${NC}"
fi
