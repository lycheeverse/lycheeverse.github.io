#! /usr/bin/env bash

LATEST=$(curl "https://api.github.com/repos/lycheeverse/lychee/releases/latest" | jq -r ".name")
FILE=src/generate/lychee-version.ts

sed -i -e "s/LYCHEE_VERSION = \"[^\"]*\"/LYCHEE_VERSION = \"$LATEST\"/" $FILE

if git status --porcelain | grep $FILE; then
    echo New version found: $LATEST
    git add $FILE
    BRANCH="bump-$LATEST"
    MESSAGE="Bump lychee: $LATEST"
    git checkout -b $BRANCH
    git add $FILE
    git config user.name "lychee bot"
    git config user.email "noreply@lychee.cli.rs"
    git commit --message "$MESSAGE"
    git push -u origin $BRANCH
    gh pr create -B master -H $BRANCH --title "$MESSAGE" --body 'Created by Github action'
else
    echo Version is up to date
fi
