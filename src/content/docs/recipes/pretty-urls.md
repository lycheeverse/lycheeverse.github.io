---
title: Pretty URLs
description: >
  A pretty URL omits certain parts of the link to make it shorter and more
  memorable, for instance by leaving out the file extension or file name.
  lychee's "fallback extensions" and "index files" features help to
  check pretty URLs in local files.
---

In the modern web, URLs are often made "pretty" in a number of ways. This makes
them more concise and memorable, but these links can cause problems for lychee
when checking local files&mdash;pretty links cannot be mapped directly to files
on disk.

Currently, lychee understands two kinds of pretty URLs:
- links to files which omit the file extension, and
- links to directories which omit the `/index.html` filename.

For these URLs, lychee has special options to handle them in local files.

:::note[Good to know]
In lychee, pretty URLs only need special handling in _local_ files. When
checking links in online webpages, we can rely on the web server to resolve
pretty links to the right destination. For local files, lychee must
handle this process itself.
:::

## Fallback extensions

Static site generators such as Hugo can be told to generate [pretty
URLs](https://gohugo.io/configuration/ugly-urls/) that omit the `.html` file
extension. Many hosting services, such as GitHub Pages and GitLab Pages, will
[automatically resolve][gitlab] these pretty URLs to the underlying `.html` file
when serving the content.

[gitlab]: https://docs.gitlab.com/user/project/pages/introduction/#resolving-ambiguous-urls

To help with local checking when links lack the `.html` extension but the files
on disk have them, lychee supports the option `--fallback-extensions`:

```bash
# If a local link does not resolve to an existing file, lychee will attempt to
# find a file by appending `.html` or `.htm`, in that order.
lychee --fallback-extensions html,htm
```

## Index files
[Index files](https://en.wikipedia.org/wiki/Web_server_directory_index) is a
common web server feature which returns the contents of an "index" file when a
directory link is requested. This feature is extremely common amongst hosting
platforms such as GitHub Pages and [GitLab Pages][gitlab], and many websites
are written to take advantage of it because it avoids needing to write
`/index.html` at the end of every directory link.

By *default*, lychee does not resolve index files and directory links are considered
valid as long as the directory exists on disk.

With the `--index-files` option, lychee can be configured to resolve index files:
```bash
# If a local link resolves to a directory, lychee will attempt to find one of
# the listed index files within the directory, in the order given.
lychee --index-files index.html,index.htm
```
If `--index-files` is specified and no file can be found, lychee will consider
the link to be broken. This can be customized by specifying `.` within the list
of index file names. The special `.` name will accept the directory if it exists and
can be used as a fallback after other index file names.

:::tip
When using `--index-files` together with `--fallback-extensions`, fallback
extensions are _not_ applied to index file names. The list of file names given
to `--index-files` should contain any necessary file extensions.
:::

