---
title: Pretty URLs
---

Static site generators such as [Hugo](https://gohugo.io/) can be told to generate
["pretty" URLs](https://gohugo.io/content-management/urls/#appearance), i.e. URLs
that do not end in the file extension `.html` but that are still resolving to the
files with that file extension.

GitHub Pages supports these pretty URLs by default: whether directing the browser
to https://lychee.cli.rs/index or to https://lychee.cli.rs/index.html, either URL
will resolve to the same page.

To help with locally checking links in such scenarios, where the links lack the
`.html` extension but the files on disk have them, Lychee supports the option
`--fallback-extensions`:

```bash
# If a local link without a file extension does not resolve to an existing file or
# directory, let lychee fall back to try again after appending the `.html` or the
# `.htm` file extension, in that order.
lychee --fallback-extensions html,htm
```
