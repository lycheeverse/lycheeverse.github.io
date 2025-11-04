---
title: File preprocessing
---

Out of the box lychee supports HTML, Markdown and plain text formats.
More precisely, HTML files are parsed as HTML5 with the use of the [html5ever] parser.
Markdown files are treated as [CommonMark] with the use of [pulldown-cmark].

For any other file format lychee falls back to a "plain text" mode.
This means that [linkify] attempts to extract URLs on a best-effort basis.
If invalid UTF-8 characters are encountered, the input file is skipped,
because it is assumed that the file is in a binary format lychee cannot understand.

lychee allows file preprocessing with the `--preprocess` flag.
For each input file the command specified with `--preprocess` is invoked instead of reading the input file directly.
In the following there are examples how to preprocess common file formats.
In most cases it's necessary to create a helper script for preprocessing,
as no parameters can be supplied from the CLI directly.

```bash
lychee files/* --preprocess ./preprocess.sh
```

The referenced `preprocess.sh` script could look like this:

```bash
#!/usr/bin/env bash

case "$1" in
*.pdf)
    exec pdftohtml -i -s -stdout "$1"
    # Alternatives:
    # exec pdftotext "$1" -
    # exec pdftk "$1" output - uncompress | grep -aPo '/URI *\(\K[^)]*'
    ;;
*.odt|*.docx|*.epub|*.ipynb)
    exec pandoc "$1" --to=html --wrap=none --markdown-headings=atx
    ;;
*.odp|*.pptx|*.ods|*.xlsx)
    # libreoffice can't print to stdout unfortunately
    libreoffice --headless --convert-to html "$1" --outdir /tmp
    file=$(basename "$1")
    file="/tmp/${file%.*}.html"
    sed '/<body/,$!d' "$file" # discard content before body which contains libreoffice URLs
    rm "$file"
;;
*.adoc|*.asciidoc)
    asciidoctor -a stylesheet! "$1" -o -
    ;;
*.csv)
    # specify --delimiter if values not delimited by ","
    exec csvtk csv2json "$1"
    ;;
*)
    # identity function, output input without changes
    exec cat
    ;;
esac
```

For more examples and information take a look at [lychee-all],
a repository dedicated to collect use-cases with file preprocessing.
Feel free to open up an issue if you are missing a specific file format or have questions.

[linkify]: https://github.com/robinst/linkify
[html5ever]: https://github.com/servo/html5ever
[CommonMark]: https://commonmark.org/
[pulldown-cmark]: https://github.com/pulldown-cmark/pulldown-cmark/
[lychee-all]: https://github.com/lycheeverse/lychee-all
