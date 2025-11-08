---
title: Caching
---

Caching is a great way to speed up your CI/CD pipeline. It can be used
to reduce the number of requests to the same URL during consecutive runs. For
example, if you have a lot of links to `https://github.com`, you can cache the
responses to reduce the load.

Here is an example GitHub Actions workflow that caches lychee results:

```yaml
name: Check URLs with lychee

on:
  push:
  pull_request:
  schedule:
    # Run everyday at 3 am UTC
    - cron: "0 3 * * *"

jobs:
  linkChecker:
    runs-on: ubuntu-latest
    steps:
      # Cache lychee results (e.g. to avoid hitting rate limits)
      - name: Restore lychee cache
        uses: actions/cache@v4
        with:
          path: .lycheecache
          key: cache-lychee-${{ github.sha }}
          restore-keys: cache-lychee-

      # check URLs with lychee
      - uses: actions/checkout@v5

      - name: lychee URL checker
        uses: lycheeverse/lychee-action@v2
        with:
          # arguments with file types to check
          args: >-
            --cache
            --verbose
            --no-progress
            './**/*.md'
            './**/*.html'
          # fail the action on broken links
          fail: true
        env:
          # to be used in case rate limits are surpassed
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

This pipeline will automatically cache the results of the lychee run.
Note that the cache will only be created if the run was successful.

If you need more control over when caches are restored and saved, you can split
the cache step and e.g. ensure to always save the cache (also when the link
check step fails):

```yml
- name: Restore lychee cache
  id: restore-cache
  uses: actions/cache/restore@v3
  with:
    path: .lycheecache
    key: cache-lychee-${{ github.sha }}
    restore-keys: cache-lychee-

- name: Run lychee
  uses: lycheeverse/lychee-action@v2
  with:
    args: "--cache --max-cache-age 1d ."

- name: Save lychee cache
  uses: actions/cache/save@v3
  if: always()
  with:
    path: .lycheecache
    key: ${{ steps.restore-cache.outputs.cache-primary-key }}
```
