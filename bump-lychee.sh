#! /usr/bin/env bash

POSITION=1 # 0 is nightly, 1 is latest stable release
LATEST=$(curl "https://api.github.com/repos/lycheeverse/lychee/releases" | jq -r ".[$POSITION] | .name")
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
