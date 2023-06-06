#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

rm -r ./frontend/build && rm -r ./backend/build && \
cd frontend && npm run build && \
cp -r build ../backend/ && echo -e "${GREEN}Build updated${NC}" && \
cd .. && \
git add . && \
git commit -m 'build updated' && \
git push origin main && echo -e "${GREEN}Dev branch updated${NC}" && \
rm -r ../lamasiaevents/* && \
cp -r ./backend/* ../lamasiaevents/ && \
rm -r ../lamasiaevents/node_modules && rm ../lamasiaevents/package-lock.json && \
cd ../lamasiaevents && git add . && git commit -m 'build updated' && git push heroku master && \
echo -e "${GREEN}Build update and deploy completed${NC}"

