#!/bin/bash
rm -r ./frontend/build && rm -r ./backend/build
cd frontend && npm run build
cp -r build ../backend/
cd ..
git add .
git commit -m 'build update'
git push origin main
