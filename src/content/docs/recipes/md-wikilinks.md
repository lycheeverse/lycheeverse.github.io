---
title: Markdown Wikilinks
---

## Relevant CLI Flags

Lychee provides a built-in `WikilinkResolver` to check Wikilinks in Markdown Files. This `WikilinkResolver` indexes all files in a given directory (incl. available subdirectories) by their filenames.
Symlinks are ignored during this procedure.
It then tries to resolve the extracted Wikilinks by looking up the Wikilink in the created index.

Both Extraction and Resolving are **deactivated by default**.

For checking Wikilinks please specify the following CLI Flags:

- `--include-wikilinks` to enable the extraction of Wikilinks
- `--base-url /path/to/your/directory` where the `WikilinkResolver` should start indexing
- `--fallback-extensions`, e.g. `--fallback-extensions md, mdx`

:::note[Good to know]
Because Wikilinks do not include a file extension, lychee needs you to specify the extensions you are using with `--fallback-extensions`
:::

Summed up the following command might be a good starting point to check for the existance of files used by Wikilinks:

```bash
lychee --include-wikilinks \
--base-url /path/to/your/local/directory \
--fallback-extensions md,mdx .
```

## Link Renaming

Some tools provide a possibility to rename Wikilinks by specifying the alternative title after a so-called pothole: `|`. Lets have a look at an example:

```Markdown
[[Filename|Alternative Title]]
[[Filename|Another Alternative Title]]
```

Both Wikilinks will be displayed with their alternative titles but link to the same file.
Lychee tries to resolve these Links by stripping away the alternative title and resolving by the remaining Filename only.
