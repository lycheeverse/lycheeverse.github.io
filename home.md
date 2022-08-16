# Welcome to lychee!

#### ...a fast, async, stream-based link checker written in Rust. ✨ <!-- {docsify-ignore} -->

lychee finds broken URLs and mail addresses inside **Markdown**, **HTML**,
reStructuredText, **websites** and more!

## Basic Usage

Let's start with the most simple usage example:

### Check All Files In Directory <!-- {docsify-ignore} -->

```
lychee .
```

This _recursively_ checks all links in all supported files inside the current
directory.

## Advanced Usage

You can also specify various types of inputs.
Below are all the different options you have.

### Check Only Specific Files

```
lychee README.md
lychee test.html info.txt
```

### Check Websites

```
lychee https://endler.dev
```

### Check Links In Directories, But Block All Network Requests

```
lychee --offline path/to/directory
```

### Check Links In A Remote File

```
lychee https://raw.githubusercontent.com/lycheeverse/lychee/master/README.md
```

### Check Links In Local Files Via Shell Glob

```
lychee ~/projects/*/README.md
```

### Advanced Globbing And `~` Expansion

```
lychee "~/projects/big_project/\*_/README._"
```

### Ignore Case When Globbing And Check Result For Each Link

```
lychee --glob-ignore-case --verbose "~/projects/\*_/[r]eadme._"
```

### Check Links From Epub File

If you have [atool] installed, you can check links inside epub files as well!

```
acat -F zip {file.epub} "_.xhtml" "_.html" | lychee -
```

> lychee parses other file formats as plaintext and extracts links using
> [linkify]. This generally works well if there are no format or encoding
> specifics, but in case you need dedicated support for a new file format, please
> consider [creating an issue][issue].

[atool]: https://www.nongnu.org/atool
[linkify]: https://github.com/robinst/linkify
[issue]: https://github.com/lycheeverse/lychee/issues
