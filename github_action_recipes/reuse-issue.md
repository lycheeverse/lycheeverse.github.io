# Reuse Issue With lychee GitHub Action

The default workflow in the
[lychee-action](https://github.com/lycheeverse/lychee-action/) repository
creates a new issue for each run of the link checker.

As an alternative, this workflow demonstrates how to **reuse an existing issue**
instead. It uses the
[last-issue-action](https://github.com/micalevisk/last-issue-action) to find the
last issue with the label `link-checker` and then uses the
[create-issue-from-file](https://github.com/peter-evans/create-issue-from-file)
action to update the issue with the results of the lychee link checker.

```yaml
- name: Find Link Checker Issue
  uses: micalevisk/last-issue-action@v1
  with:
    state: open
    labels: |
      link-checker
- name: Update Issue
  uses: peter-evans/create-issue-from-file@v4
  with:
    title: Broken links detected in docs 🔗
    # Update an existing issue if one was found (issue-number),
    # otherwise an empty value creates a new issue:
    issue-number: "${{ steps.link-checker-issue.outputs.issue_number }}"
    content-filepath: ./lychee/out.md
    token: ${{secrets.GITHUB_TOKEN}}
    labels: |
      link-checker
```
