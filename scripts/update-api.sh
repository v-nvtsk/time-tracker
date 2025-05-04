#!/bin/bash
cd "$(dirname "$0")"

SOURCE_FOLDER="../tools/generated"
FRONTEND_FOLDER="../packages/frontend/src/api/generated"
EXTENSION_FOLDER="../packages/extension/src/background/api/generated"

rm -rf $FRONTEND_FOLDER $EXTENSION_FOLDER
mkdir -p $FRONTEND_FOLDER
mkdir -p $EXTENSION_FOLDER

cp -R $SOURCE_FOLDER/* $FRONTEND_FOLDER/
cp -R $SOURCE_FOLDER/* $EXTENSION_FOLDER/


rm -rf $SOURCE_FOLDER/*