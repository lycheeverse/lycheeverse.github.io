---
title: Excluding Links
---

lychee allows you to selectively check links using `--include` and `--exclude` parameters. Both accept regular expressions.

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

## Permanently Excluding Links

Do you have a bunch of URLs that you always want to exclude?
You can add them to a `.lycheeignore` file in the root of your project.

```plaintext title=".lycheeignore"
https://www.zombo.com/
# This is a comment, which will be ignored
https://www.youtube.com/watch?v=dQw4w9WgXcQ
# Regex is also supported
https?:\/\/(www\.)?reddit\.com\/r\/(funny||videos)
```
