---
title: Check Links in Pull Requests
---

This recipe shows how to check for broken links in pull requests. It only checks
newly added links by comparing against the base branch, reducing noise from
existing broken links.

## Usage

Add this workflow to `.github/workflows/check-links.yml` in your repository.

## Workflow

```yaml
name: Check Links In Pull Requests

on:
  pull_request:
    branches: 
      - main
    # Optionally limit the check to certain file types
    # paths:
    #   - '**/*.md'
    #   - '**/*.html'
    
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  check-links:
    runs-on: ubuntu-latest
    
    steps:
      - name: Clone repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          ref: ${{github.event.pull_request.head.ref}}
          repository: ${{github.event.pull_request.head.repo.full_name}}

      - name: Check out base branch
        run: git checkout ${{github.event.pull_request.base.ref}}

      - name: Dump all links from ${{github.event.pull_request.base.ref}}
        uses: lycheeverse/lychee-action@v2
        with:
          args: |
            --dump
            --include-fragments
            .
          output: ./existing-links.txt
        continue-on-error: true  # Don't fail if base branch check has issues

      - name: Stash untracked files
        run: git stash push --include-untracked

      - name: Check out feature branch
        run: git checkout ${{ github.head_ref }}

      - name: Apply stashed changes
        run: git stash pop || true

      - name: Update ignore file
        run: |
          if [ -f "existing-links.txt" ]; then
            cat existing-links.txt >> .lycheeignore
          fi

      - name: Check links
        uses: lycheeverse/lychee-action@v2
        with:
          args: |
            --no-progress
            --include-fragments
            .

      - name: Provide helpful failure message
        if: failure()
        run: |
          echo "::error::Link check failed! Please review the broken links reported above."
          echo ""
          echo "If certain links are valid but fail due to:"
          echo "- CAPTCHA challenges"
          echo "- IP blocking"
          echo "- Authentication requirements"
          echo "- Rate limiting"
          echo ""
          echo "Consider adding them to .lycheeignore to bypass future checks."
          echo "Format: Add one URL pattern per line"
          exit 1
```

## Explanation

The workflow is triggered on pull request events against the `main` branch.
It clones the repository and checks out the main branch to dump all links.
It then stashes untracked files and checks out the feature branch.
The stashed changes are applied and the links from the main branch are appended to the `.lycheeignore` file.
Finally, the links in the feature branch are checked and suggestions are provided if the check fails.

## References

- [Real-world example from the `pytorch/tutorials` repo](https://github.com/pytorch/tutorials/pull/3085)
- [Discussion on GitHub](https://github.com/lycheeverse/lychee-action/issues/238)