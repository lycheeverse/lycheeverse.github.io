# Add Comment to Pull Request

This recipe shows how to add a comment to a pull request. This is useful if you
want to notify the author of a pull request about broken links.

## Workflow

```yaml
name: Check Links

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: lycheeverse/lychee-action@v1.5.4
      - name: Comment Broken Links
        uses: marocchino/sticky-pull-request-comment@v2
        with:
          path: lychee/out.md
```

## Explanation

The workflow is triggered on pull request events. It checks out the repository
and runs lychee.

The result of this workflow is a comment on the pull request. The comment
contains the output of lychee.

## Example

Here is an example of a pull request with a comment from lychee:
https://github.com/lycheeverse/sandbox/pull/1
