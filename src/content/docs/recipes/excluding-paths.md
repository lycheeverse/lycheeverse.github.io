---
title: Excluding Paths
---

lychee respects '.gitignore' and '.ignore' files by default.
This way you normally don't have to manually exclude directories such as `.git`, `node_modules` or `vendor`.
This default behavior can be disabled with `--no-ignore`.
Additionally, lychee ignores hidden files by default.
To traverse hidden directories and check hidden files use `--hidden`.

Sometimes it is necessary to skip specific paths from being checked.
You might think that you can just put the path in the [`.lycheeignore`](/recipes/excluding-links) file, but that won't work.
The `.lycheeignore` file is used for excluding URLs, not paths. (as the `--exclude` option)

Instead, you can use the `--exclude-path` flag to exclude paths from being checked.
The values are treated as regular expressions.
For example you can use `--exclude-path '(^|/)test\.md$'` to exclude all files called exactly `test.md`.
Note that using `--exclude-path 'test.md'` would also exclude files like `docs/test-md/intro.txt` and `testamd.html`.

Alternatively, you can also use the `exclude_path` key in the configuration file:

```toml title="lychee.toml"
exclude_path = [
    "\\.txt$",      # skip .txt extensions
    "(^|/)test/",   # skip directories named "test"
    "[aeiouAEIOU]", # exclude paths containing vowels
]
```

[Here](https://github.com/mre/endler.dev/blob/50d8d5f90dbafa445c9455e420a40f8866f3e1c7/lychee.toml#L28) is an example config file.
