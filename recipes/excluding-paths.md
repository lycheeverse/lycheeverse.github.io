# Excluding Paths

Sometimes it is necessary to skip paths from being checked.
For example, you might want to skip the `node_modules` directory or a `vendor` directory.

You might think that you can just put the path in the `.lycheeignore` file, but that won't work.
The `.lycheeignore` file is only used for excluding URLs, not paths.

Instead, you can use the `--exclude-path` flag to exclude paths from being checked.
Example: `--exclude-path node_modules` or `--exclude-path example\.(com|org)`.

Alternatively, you can also use the `exclude_path` key in the `lychee.toml` file:

```toml
exclude_path = ["node_modules"]
```

Regular expressions are also supported.

```toml
exclude_path = ["node_modules", "^./dir/", "*/dev/*"]
```

[Here](https://github.com/mre/endler.dev/blob/50d8d5f90dbafa445c9455e420a40f8866f3e1c7/lychee.toml#L28) is an example config file.
