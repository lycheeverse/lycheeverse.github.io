---
title: CLI
---
<!--
The _cli.md file is used as a template to generate the cli.md file
at build time.
-->

README-OPTIONS-PLACEHOLDER

## Repeating Options

Options can be specified multiple times. This is true for:

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

There is a shorthand where you can specify multiple arguments in one go.

Instead of writing this:

```bash
lychee --scheme http --scheme file https://example.com
```

You can also write this:

```bash
lychee --scheme http file -- https://example.com
```

:::caution[Attention]
If you use the shorthand notation you need to separate the options from the inputs with `--`.
Otherwise, the options will be interpreted as inputs!
:::
