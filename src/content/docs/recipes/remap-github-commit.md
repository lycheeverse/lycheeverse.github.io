---
title: Remapping GitHub URLs to a Commit
---

When a pull request adds a link to a file that only exists on the feature
branch, link checking in CI can fail in a frustrating way: the link is "broken"
because the file isn't on the default branch yet, but the pull request can't be
merged until the link check passes.

This is a circular requirement:

- The link is broken because the change isn't merged yet.
- The change can't be merged because the link is broken.

## The fix

Use lychee's [`--remap`](/recipes/migration/) option to rewrite GitHub URLs that
point at the default branch (e.g. `main`) so that they point at the commit being
checked instead. Because the new file already exists in that commit, the link
resolves and the check passes.

```bash
commit=$(git rev-parse HEAD)

lychee \
  --remap "https://github\.com/your-org/your-repo/blob/main https://github.com/your-org/your-repo/blob/$commit" \
  --remap "https://github\.com/your-org/your-repo/tree/main https://github.com/your-org/your-repo/tree/$commit" \
  .
```

The `blob` rule covers links to files and the `tree` rule covers links to
directories. Add more rules if you also link to other `main`-based paths such as
`raw`.

This approach has a nice side effect: if a pull request *deletes* or *moves* a
file, the link to it will correctly be reported as broken, because it no longer
exists in the checked commit.

## In GitHub Actions

For pull request workflows, remap to the **merge commit** rather than the latest
commit of the feature branch. The merge commit also contains everything from the
base branch, so the check reflects the repository state *after* merging.

On `pull_request` events, `github.sha` already refers to the merge commit, so it
is exactly the value you want:

```yaml
name: Check links

on:
  pull_request:

jobs:
  linkChecker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5

      - name: Link Checker
        uses: lycheeverse/lychee-action@v2
        with:
          args: >-
            --remap "https://github\.com/${{ github.repository }}/blob/main https://github.com/${{ github.repository }}/blob/${{ github.sha }}"
            --remap "https://github\.com/${{ github.repository }}/tree/main https://github.com/${{ github.repository }}/tree/${{ github.sha }}"
            --verbose
            --no-progress
            .
```

`${{ github.repository }}` expands to `your-org/your-repo`, so the same workflow
works in any repository without editing the URLs.

:::note
Replace `main` with your default branch name if it differs (for example
`master`).
:::

## When to use a fixed commit instead

Instead of remapping, you can link directly to a fixed commit (e.g.
`https://github.com/your-org/your-repo/blob/<commit>/file`). That guarantees the
link never changes, but it also won't follow the latest version of the file.

Remapping is the better choice when you want to link to the *latest* version of a
file on the default branch and still be told when that file is moved or removed.
