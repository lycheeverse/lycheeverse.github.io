---
title: Configuration File
---

The configuration file is a [TOML](https://toml.io) file that can be used to specify the options that are also available on the command line.
It comes in handy when you want to specify a lot of options, or when you want to configure lychee for continuous integration as part of a repository.

By default `lychee.toml` is used if it exists in the current working directory.
If `--config <PATH>` is specified, then the configuration file at the specified path will be used.

```bash
lychee --config config.toml
```

For example, the default value for the `--timeout` option is `20` seconds.
If you want to change this value, you can do so in the configuration file.

```toml title="lychee.toml"
timeout = 30
```

## Example

Here is an example configuration file making use of every single option.

CONFIG-VERSION-NOTE-PLACEHOLDER

```toml title="lychee.toml"
CONFIG-PLACEHOLDER
```
