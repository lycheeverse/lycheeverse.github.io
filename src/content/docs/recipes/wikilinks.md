---
title: Wikilinks
---

lychee can check Wikilinks in Markdown files as long as they provide a path to the linked ressource.

```markdown
# ✅ Good - links can be checked

[[https://example.com/docs/]]
[[./another/markdown/file.md]]

# ❌ Bad - Will not work

[[another-markdown-page]]
```

Tools like e.g. [Obsidian](https://obsidian.md/) use the second (bad) form of link, using only the file name without path or file extension.

lychee has no possibility of determining the correct path for this file as it could be:

- in the same directory
- in a subdirectory
- in a parent directory

A recursive search of all those options is currently not supported.
