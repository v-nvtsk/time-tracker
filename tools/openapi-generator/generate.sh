openapi-generator-cli generate \
    -i http://nestjs:3000/api-json \
    --generator-name typescript-fetch \
    -o /local/out \
    --additional-properties=useSingleRequestParameter=true
