#!/bin/bash
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
FILE_NAME="dist.pem"
FILE_PATH="${SCRIPT_DIR}/${FILE_NAME}"

if [ ! -f "$FILE_PATH" ]; then
  openssl genrsa -out $FILE_PATH 768
  # openssl pkcs8 -topk8 -nocrypt -in $FILE_PATH -out $SCRIPT_DIR/privkey2.pem
  echo "Файл создан: $FILE_PATH"
else
  echo "Файл уже существует: $FILE_PATH"
fi
