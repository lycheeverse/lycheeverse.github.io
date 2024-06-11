---
title: Command Line Options
---

lychee supports a lot of command line options.
You can see all of them by running `lychee --help`.

Below is the full list of options with a short description.

## Options

```bash
A fast, async link checker

Finds broken URLs and mail addresses inside Markdown, HTML, `reStructuredText`, websites and more!

Usage: lychee [OPTIONS] <inputs>...

Arguments:
  <inputs>...
          The inputs (where to get links to check from). These can be: files (e.g. `README.md`), file globs (e.g. `"~/git/*/README.md"`), remote URLs (e.g. `https://example.com/README.md`) or standard input (`-`). NOTE: Use `--` to separate inputs from options that allow multiple arguments

Options:
  -c, --config <CONFIG_FILE>
          Configuration file to use

          [default: lychee.toml]

  -v, --verbose...
          Set verbosity level; more output per occurrence (e.g. `-v` or `-vv`)

  -q, --quiet...
          Less output per occurrence (e.g. `-q` or `-qq`)

  -n, --no-progress
          Do not show progress bar.
          This is recommended for non-interactive shells (e.g. for continuous integration)

      --cache
          Use request cache stored on disk at `.lycheecache`

      --max-cache-age <MAX_CACHE_AGE>
          Discard all cached requests older than this duration

          [default: 1d]

      --dump
          Don't perform any link checking. Instead, dump all the links extracted from inputs that would be checked

      --dump-inputs
          Don't perform any link extraction and checking. Instead, dump all input sources from which links would be collected

      --archive <ARCHIVE>
          Specify the use of a specific web archive. Can be used in combination with `--suggest`

          [possible values: wayback]

      --suggest
          Suggest link replacements for broken links, using a web archive. The web archive can be specified with `--archive`

  -m, --max-redirects <MAX_REDIRECTS>
          Maximum number of allowed redirects

          [default: 5]

      --max-retries <MAX_RETRIES>
          Maximum number of retries per request

          [default: 3]

      --max-concurrency <MAX_CONCURRENCY>
          Maximum number of concurrent network requests

          [default: 128]

  -T, --threads <THREADS>
          Number of threads to utilize. Defaults to number of cores available to the system

  -u, --user-agent <USER_AGENT>
          User agent

          [default: lychee/0.14.2]

  -i, --insecure
          Proceed for server connections considered insecure (invalid TLS)

  -s, --scheme <SCHEME>
          Only test links with the given schemes (e.g. https). Omit to check links with any other scheme. At the moment, we support http, https, file, and mailto

      --offline
          Only check local files and block network requests

      --include <INCLUDE>
          URLs to check (supports regex). Has preference over all excludes

      --exclude <EXCLUDE>
          Exclude URLs and mail addresses from checking (supports regex)

      --exclude-file <EXCLUDE_FILE>
          Deprecated; use `--exclude-path` instead

      --exclude-path <EXCLUDE_PATH>
          Exclude file path from getting checked

  -E, --exclude-all-private
          Exclude all private IPs from checking.
          Equivalent to `--exclude-private --exclude-link-local --exclude-loopback`

      --exclude-private
          Exclude private IP address ranges from checking

      --exclude-link-local
          Exclude link-local IP address range from checking

      --exclude-loopback
          Exclude loopback IP address range and localhost from checking

      --exclude-mail
          Exclude all mail addresses from checking (deprecated; excluded by default)

      --include-mail
          Also check email addresses

      --remap <REMAP>
          Remap URI matching pattern to different URI

      --fallback-extensions <FALLBACK_EXTENSIONS>
          Test the specified file extensions for URIs when checking files locally.
          Multiple extensions can be separated by commas. Extensions will be checked in
          order of appearance.

          Example: --fallback-extensions html,htm,php,asp,aspx,jsp,cgi

      --header <HEADER>
          Custom request header

  -a, --accept <ACCEPT>
          A List of accepted status codes for valid links

          The following accept range syntax is supported: [start]..[=]end|code. Some valid
          examples are:

          - 200..=204
          - 200..204
          - ..=204
          - ..204
          - 200

          Use "lychee --accept '200..=204, 429, 500' <inputs>..." to provide a comma-
          separated list of accepted status codes. This example will accept 200, 201,
          202, 203, 204, 429, and 500 as valid status codes.

          [default: 100..=103,200..=299,403..=403]

      --include-fragments
          Enable the checking of fragments in links

  -t, --timeout <TIMEOUT>
          Website timeout in seconds from connect to response finished

          [default: 20]

  -r, --retry-wait-time <RETRY_WAIT_TIME>
          Minimum wait time in seconds between retries of failed requests

          [default: 1]

  -X, --method <METHOD>
          Request method

          [default: get]

  -b, --base <BASE>
          Base URL or website root directory to check relative URLs e.g. https://example.com or `/path/to/public`

      --basic-auth <BASIC_AUTH>
          Basic authentication support. E.g. `http://example.com username:password`

      --github-token <GITHUB_TOKEN>
          GitHub API token to use when checking github.com links, to avoid rate limiting

          [env: GITHUB_TOKEN]

      --skip-missing
          Skip missing input files (default is to error if they don't exist)

      --include-verbatim
          Find links in verbatim sections like `pre`- and `code` blocks

      --glob-ignore-case
          Ignore case when expanding filesystem path glob inputs

  -o, --output <OUTPUT>
          Output file of status report

  -f, --format <FORMAT>
          Output format of final status report (compact, detailed, json, markdown)

          [default: compact]

      --require-https
          When HTTPS is available, treat HTTP links as errors

      --cookie-jar <COOKIE_JAR>
          Tell lychee to read cookies from the given file. Cookies will be stored in the cookie jar and sent with requests. New cookies will be stored in the cookie jar and existing cookies will be updated

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version

```

:::note
Most of the options (like `--scheme` or `--exclude`) are for **links inside inputs**,
and **not** for the filtering the inputs themselves.
:::

## On Schemes

lychee supports the following schemes:

- `http`
- `https`
- `file`
- `mailto`

If you don't specify any schemes, lychee will check all links regardless of
their scheme. Otherwise, it will only check links with the specified schemes.

## Repeating Options

Options marked with `...` can be specified multiple times.
For example, `--exclude` can be specified multiple times to exclude multiple URLs.
This is also true for `--header`, `--include`, `--remap`, `--scheme`, and `--exclude-path`.

Here is an example:

```bash
lychee --exclude https://example.com --exclude https://example.org
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
