---
title: Filtering Links
---

You can tell lychee to only check certain links by using a combination of the
`--include` and `--exclude` parameters. Both parameters take a regular
expression as an argument.

Here are some examples:

```bash
# Exclude all links that contain "example.com" and "example.org"
lychee --exclude example\.com --exclude example\.org

# Same as above, but using a single exclude parameter
lychee --exclude example\.(com|org)
```

Includes take precedence over excludes.
You can use that fact to check only links that contain a specific string.

For example, if you want to check all links that contain the string `twitter.com`,
you can use the following command:

```bash
lychee --exclude '.*' --include 'twitter\.com'
```
