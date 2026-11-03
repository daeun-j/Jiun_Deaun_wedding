#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
output=${1:-dist}
if [ -e "$output" ]; then
  echo "Choose a new output directory; existing files are never overwritten." >&2
  exit 1
fi
mkdir -p "$output"
cp -R index.html styles.css assets src "$output/"
