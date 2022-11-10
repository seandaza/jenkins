#!/usr/bin/env sh

npm run staging

npm install -g firebase-tools

firebase deploy -P staging --token "$FIREBASE_DEPLOY_TOKEN"



#npm install
#npm run build
#npm i -g firebase-tools@latest
#firebase -P dev target:apply hosting dev_target per-sider-qa --debug
#firebase deploy -P dev --only hosting:dev_target  #$FIREBASE_TOKEN --debug