---
title: Check Links in Repository
---

This recipe demonstrates how to set up an automated workflow that will check all repository links once per day and create an issue in case of errors.

## Usage

Add this workflow to `.github/workflows/links.yml` in your repository

## Workflow

```yaml
name: Links

on:
  repository_dispatch:
  workflow_dispatch:
  schedule:
    - cron: "00 18 * * *"

jobs:
  linkChecker:
    runs-on: ubuntu-latest
    permissions:
      issues: write # required for peter-evans/create-issue-from-file
    steps:
      - uses: actions/checkout@v4

      - name: Link Checker
        id: lychee
        uses: lycheeverse/lychee-action@v2
        with:
          fail: false

      - name: Create Issue From File
        if: steps.lychee.outputs.exit_code != 0
        uses: peter-evans/create-issue-from-file@v5
        with:
          title: Link Checker Report
          content-filepath: ./lychee/out.md
          labels: report, automated issue
```

## Explanation

The workflow is triggered in three scenarios:

1. Manual trigger via `workflow_dispatch`
2. Repository dispatch events
3. Automated schedule (runs daily at 18:00 UTC)

The workflow executes the following steps:

1. Checks out the repository using `actions/checkout@v4`
2. Runs the Lychee link checker (`lycheeverse/lychee-action@v2`) with `fail: false` to prevent workflow failure
3. If any broken links are detected (exit code != 0), creates a new GitHub issue using `peter-evans/create-issue-from-file@v5`
   - The issue contains the detailed report from `./lychee/out.md`
   - Issues are labeled with "report" and "automated issue"

The workflow requires write permissions for issues to create automated reports when broken links are found.
