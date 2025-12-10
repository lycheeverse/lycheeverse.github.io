#! /usr/bin/env bash

set -eo pipefail

LATEST=$(curl --fail "https://api.github.com/repos/lycheeverse/lychee/releases/latest" | jq -er ".name")
FILE=src/generate/lychee-version.ts

sed -i -e "s/LYCHEE_VERSION = \"[^\"]*\"/LYCHEE_VERSION = \"$LATEST\"/" $FILE

if [ -n "$CI" ]; then
    git config user.name "lychee bot"
    git config user.email "noreply@lychee.cli.rs"
fi

if git status --porcelain | grep $FILE; then
    echo New version found: $LATEST
    git add $FILE
    BRANCH="bump-$LATEST"
    MESSAGE="Bump lychee: $LATEST"
    git checkout -b $BRANCH
    git add $FILE
    git commit --message "$MESSAGE"
    git push -u origin $BRANCH
    gh pr create -B master -H $BRANCH --title "$MESSAGE" --body 'Created by Github action'
else
    echo Version is up to date
fi
