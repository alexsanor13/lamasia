#!/bin/bash
rm -r ./frontend/build && rm -r ./backend/build && \
cd frontend && npm run build && \
cp -r build ../backend/ && echo "build updated" && \
cd .. && \
git add . && \
git commit -m 'build updated' && \
git push origin main && echo "dev branch updated" && \
rm -r ../lamasiaevents/* && \
cp -r ./backend/* ../lamasiaevents/ && \
rm -r ../lamasiaevents/node_modules && rm ../lamasiaevents/package-lock.json && \
cd ../lamasiaevents && git add . && git commit -m 'build updated' && git push heroku master && \
echo "Build update and deploy completed"

