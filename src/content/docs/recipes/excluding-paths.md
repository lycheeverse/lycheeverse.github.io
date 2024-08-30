---
title: Excluding Paths
---

Sometimes it is necessary to skip paths from being checked.
For example, you might want to skip the `node_modules` directory or a `vendor` directory.

You might think that you can just put the path in the [`.lycheeignore`](/recipes/excluding-links) file, but that won't work.
The `.lycheeignore` file is only used for excluding URLs, not paths.

Instead, you can use the `--exclude-path` flag to exclude paths from being checked.
Example: `--exclude-path node_modules` or `--exclude-path example\.(com|org)`.

Alternatively, you can also use the `exclude_path` key in the configuration file:

```toml title="lychee.toml"
exclude_path = ["node_modules"]
```

Regular expressions are also supported.

```toml title="lychee.toml"
exclude_path = ["node_modules", "^./dir/", ".*/dev/.*"]
```

[Here](https://github.com/mre/endler.dev/blob/50d8d5f90dbafa445c9455e420a40f8866f3e1c7/lychee.toml#L28) is an example config file.

## Examples

Here are some more helpful use-cases for excluding paths to get you started.

### Dependency Management

Exclude third-party dependencies as they're not typically user-maintained.

```bash
lychee --exclude-path node_modules
lychee --exclude-path vendor
```

### Build and Distribution Directories

Skip generated or compiled directories.

```bash
lychee --exclude-path dist
lychee --exclude-path build
lychee --exclude-path out
```

### Temporary Files and Directories

Avoid checking transient or temporary storage.

```bash
lychee --exclude-path .tmp --exclude-path .cache
```

### Version Control

Exclude version control directories.

```bash
lychee --exclude-path .git
lychee --exclude-path .svn
lychee --exclude-path "\.git|\.svn"
```

### Documentation and Non-Code Assets

Skip documentation and non-code related directories.

```bash
lychee --exclude-path docs --exclude-path assets/images
```

### Backup Files

Avoid checking backup files created by editors or tools.

```bash
lychee --exclude-path "*.bak"
```

### Logs and Databases

Exclude directories or files storing logs or databases.

```bash
lychee --exclude-path logs
```
