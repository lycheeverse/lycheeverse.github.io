---
title: Configuration File
---

The configuration file is a [TOML](https://toml.io) file that can be used to specify the options that are also available on the command line.
It comes in handy when you want to specify a lot of options, or when you want to configure lychee for continuous integration as part of a repository.

The configuration file is optional and can be specified with the `--config` option.

```bash
lychee --config ./lychee.toml
```

The configuration file is also used to specify the default values for the options that are also available on the command line.

For example, the default value for the `--timeout` option is `20` seconds. If you want to change this value, you can do so in the configuration file.

```toml title="lychee.toml"
timeout = 30
```

## Location

`./lychee.toml` (in the current working directory) is used if no other configuration file is specified.
Please find the [latest version on Github](https://github.com/lycheeverse/lychee/blob/master/lychee.example.toml).

Here is an example of a configuration file:

```toml title="lychee.toml"
CONFIG-PLACEHOLDER
```
