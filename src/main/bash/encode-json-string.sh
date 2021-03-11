##!/usr/bin/env bash

# Do not echo command output
set +x

INPUT="$@"

if command -v jq >/dev/null
then
  jq --arg message "$INPUT" -n '$message'
  exit 0
fi

if command -v node >/dev/null
then
  node -e 'console.log(JSON.stringify(process.argv.slice(1).join(" ")))' "$INPUT"
  exit 0
fi

echo '"No jq or node installed, cannot encode string"'
