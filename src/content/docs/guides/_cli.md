---
title: Command-Line Flags
---
<!--
The _cli.md file is used as a template to generate the cli.md file
at build time.
-->

README-OPTIONS-PLACEHOLDER

## Repeating Options

Some options can be specified multiple times. This is true for:

- `--exclude`
- `--exclude-path`
- `--header`
- `--include`
- `--remap`
- `--scheme`

Here is an example:

```bash
lychee --exclude https://example.com --exclude https://example.org README.md
```

To specify multiple values in this way, the argument flag should be repeated.
Otherwise, the extra values would be treated as link checking inputs.
