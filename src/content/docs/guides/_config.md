---
title: Configuration File
---

The configuration file is a [TOML](https://toml.io) file that can be used to specify the options that are also available on the command line.
It comes in handy when you want to specify a lot of options, or when you want to configure lychee for continuous integration as part of a repository.

The configuration file is optional and can be specified with the `--config` option.
`./lychee.toml` in the current working directory is used by default if it exists, even when `--config` isn't specified.

```bash
lychee --config ./lychee.toml
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
