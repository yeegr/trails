#!/bin/bash

cd ~/desktop
git clone https://github.com/yeegr/trails
cd trails
npm install
git checkout -- .
export NODE_ENV=development
npm run build
npm start
npm run ios
