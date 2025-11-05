---
title: CLI
---
<!--
The _cli.md file is used as a template to generate the cli.md file
at build time.
-->

lychee is a fast, asynchronous link checker which detects broken URLs and mail addresses in local files and websites. It supports Markdown and HTML and works well with many plain text file formats.

lychee is powered by lychee-lib, the Rust library for link checking.

```
Usage: lychee [OPTIONS] [inputs]...
```

## Arguments
### [inputs]...

```bash
lychee [inputs]...
```
    Inputs for link checking (where to get links to check from). These can be:
    files (e.g. `README.md`), file globs (e.g. `'~/git/*/README.md'`), remote URLs
    (e.g. `https://example.com/README.md`), or standard input (`-`). Alternatively,
    use `--files-from` to read inputs from a file.

    NOTE: Use `--` to separate inputs from options that allow multiple arguments.

## Options
### -a, --accept

```bash
lychee --accept <ACCEPT>
```
    A List of accepted status codes for valid links

    The following accept range syntax is supported: [start]..[[=]end]|code. Some valid
    examples are:

    - 200 (accepts the 200 status code only)
    - ..204 (accepts any status code < 204)
    - ..=204 (accepts any status code <= 204)
    - 200..=204 (accepts any status code from 200 to 204 inclusive)
    - 200..205 (accepts any status code from 200 to 205 excluding 205, same as 200..=204)

    Use "lychee --accept '200..=204, 429, 500' <inputs>..." to provide a comma-
    separated list of accepted status codes. This example will accept 200, 201,
    202, 203, 204, 429, and 500 as valid status codes.

**default**: 100..=103,200..=299


### --archive

```bash
lychee --archive <ARCHIVE>
```
    Specify the use of a specific web archive. Can be used in combination with `--suggest`

**possible values**: wayback


### -b, --base-url

```bash
lychee --base-url <BASE_URL>
```
    Base URL to use when resolving relative URLs in local files. If specified,
    relative links in local files are interpreted as being relative to the given
    base URL.

    For example, given a base URL of `https://example.com/dir/page`, the link `a`
    would resolve to `https://example.com/dir/a` and the link `/b` would resolve
    to `https://example.com/b`. This behavior is not affected by the filesystem
    path of the file containing these links.

    Note that relative URLs without a leading slash become siblings of the base
    URL. If, instead, the base URL ended in a slash, the link would become a child
    of the base URL. For example, a base URL of `https://example.com/dir/page/` and
    a link of `a` would resolve to `https://example.com/dir/page/a`.

    Basically, the base URL option resolves links as if the local files were hosted
    at the given base URL address.

    The provided base URL value must either be a URL (with scheme) or an absolute path.
    Note that certain URL schemes cannot be used as a base, e.g., `data` and `mailto`.

### --base

```bash
lychee --base <BASE>
```
    Deprecated; use `--base-url` instead

### --basic-auth

```bash
lychee --basic-auth <BASIC_AUTH>
```
    Basic authentication support. E.g. `http://example.com username:password`

### -c, --config

```bash
lychee --config <CONFIG_FILE>
```
    Configuration file to use

**default**: lychee.toml


### --cache

```bash
lychee --cache
```
    Use request cache stored on disk at `.lycheecache`

### --cache-exclude-status

```bash
lychee --cache-exclude-status <CACHE_EXCLUDE_STATUS>
```
    A list of status codes that will be ignored from the cache

    The following exclude range syntax is supported: [start]..[[=]end]|code. Some valid
    examples are:

    - 429 (excludes the 429 status code only)
    - 500.. (excludes any status code >= 500)
    - ..100 (excludes any status code < 100)
    - 500..=599 (excludes any status code from 500 to 599 inclusive)
    - 500..600 (excludes any status code from 500 to 600 excluding 600, same as 500..=599)

    Use "lychee --cache-exclude-status '429, 500..502' <inputs>..." to provide a
    comma-separated list of excluded status codes. This example will not cache results
    with a status code of 429, 500 and 501.

### --cookie-jar

```bash
lychee --cookie-jar <COOKIE_JAR>
```
    Tell lychee to read cookies from the given file. Cookies will be stored in the
    cookie jar and sent with requests. New cookies will be stored in the cookie jar
    and existing cookies will be updated.

### --default-extension

```bash
lychee --default-extension <EXTENSION>
```
    This is the default file extension that is applied to files without an extension.

    This is useful for files without extensions or with unknown extensions. The extension will be used to determine the file type for processing. Examples: --default-extension md, --default-extension html

### --dump

```bash
lychee --dump
```
    Don't perform any link checking. Instead, dump all the links extracted from inputs that would be checked

### --dump-inputs

```bash
lychee --dump-inputs
```
    Don't perform any link extraction and checking. Instead, dump all input sources from which links would be collected

### -E, --exclude-all-private

```bash
lychee --exclude-all-private
```
    Exclude all private IPs from checking.
    Equivalent to `--exclude-private --exclude-link-local --exclude-loopback`

### --exclude

```bash
lychee --exclude <EXCLUDE>
```
    Exclude URLs and mail addresses from checking. The values are treated as regular expressions

### --exclude-file

```bash
lychee --exclude-file <EXCLUDE_FILE>
```
    Deprecated; use `--exclude-path` instead

### --exclude-link-local

```bash
lychee --exclude-link-local
```
    Exclude link-local IP address range from checking

### --exclude-loopback

```bash
lychee --exclude-loopback
```
    Exclude loopback IP address range and localhost from checking

### --exclude-path

```bash
lychee --exclude-path <EXCLUDE_PATH>
```
    Exclude paths from getting checked. The values are treated as regular expressions

### --exclude-private

```bash
lychee --exclude-private
```
    Exclude private IP address ranges from checking

### --extensions

```bash
lychee --extensions <EXTENSIONS>
```
    Test the specified file extensions for URIs when checking files locally.

    Multiple extensions can be separated by commas. Note that if you want to check filetypes,
    which have multiple extensions, e.g. HTML files with both .html and .htm extensions, you need to
    specify both extensions explicitly.

**default**: md,mkd,mdx,mdown,mdwn,mkdn,mkdown,markdown,html,htm,txt


### -f, --format

```bash
lychee --format <FORMAT>
```
    Output format of final status report

**default**: compact

**possible values**: compact, detailed, json, markdown, raw


### --fallback-extensions

```bash
lychee --fallback-extensions <FALLBACK_EXTENSIONS>
```
    When checking locally, attempts to locate missing files by trying the given
    fallback extensions. Multiple extensions can be separated by commas. Extensions
    will be checked in order of appearance.

    Example: --fallback-extensions html,htm,php,asp,aspx,jsp,cgi

    Note: This option takes effect on `file://` URIs which do not exist and on
          `file://` URIs pointing to directories which resolve to themself (by the
          --index-files logic).

### --files-from

```bash
lychee --files-from <PATH>
```
    Read input filenames from the given file or stdin (if path is '-').

    This is useful when you have a large number of inputs that would be
    cumbersome to specify on the command line directly.

    Examples:
      lychee --files-from list.txt
      find . -name '*.md' | lychee --files-from -
      echo 'README.md' | lychee --files-from -

    File Format:
      Each line should contain one input (file path, URL, or glob pattern).
      Lines starting with '#' are treated as comments and ignored.
      Empty lines are also ignored.

### --generate

```bash
lychee --generate <GENERATE>
```
    Generate special output (e.g. the man page) instead of performing link checking

**possible values**: man


### --github-token

```bash
lychee --github-token <GITHUB_TOKEN>
```
    GitHub API token to use when checking github.com links, to avoid rate limiting

**env**: GITHUB_TOKEN


### --glob-ignore-case

```bash
lychee --glob-ignore-case
```
    Ignore case when expanding filesystem path glob inputs

### -h, --help

```bash
lychee --help
```
    Print help (see a summary with '-h')

### -H, --header

```bash
lychee --header <HEADER:VALUE>
```
    Set custom header for requests

    Some websites require custom headers to be passed in order to return valid responses.
    You can specify custom headers in the format 'Name: Value'. For example, 'Accept: text/html'.
    This is the same format that other tools like curl or wget use.
    Multiple headers can be specified by using the flag multiple times.

### --hidden

```bash
lychee --hidden
```
    Do not skip hidden directories and files

### -i, --insecure

```bash
lychee --insecure
```
    Proceed for server connections considered insecure (invalid TLS)

### --include

```bash
lychee --include <INCLUDE>
```
    URLs to check (supports regex). Has preference over all excludes

### --include-fragments

```bash
lychee --include-fragments
```
    Enable the checking of fragments in links

### --include-mail

```bash
lychee --include-mail
```
    Also check email addresses

### --include-verbatim

```bash
lychee --include-verbatim
```
    Find links in verbatim sections like `pre`- and `code` blocks

### --include-wikilinks

```bash
lychee --include-wikilinks
```
    Check WikiLinks in Markdown files

### --index-files

```bash
lychee --index-files <INDEX_FILES>
```
    When checking locally, resolves directory links to a separate index file.
    The argument is a comma-separated list of index file names to search for. Index
    names are relative to the link's directory and attempted in the order given.

    If `--index-files` is specified, then at least one index file must exist in
    order for a directory link to be considered valid. Additionally, the special
    name `.` can be used in the list to refer to the directory itself.

    If unspecified (the default behavior), index files are disabled and directory
    links are considered valid as long as the directory exists on disk.

    Example 1: `--index-files index.html,readme.md` looks for index.html or readme.md
               and requires that at least one exists.

    Example 2: `--index-files index.html,.` will use index.html if it exists, but
               still accept the directory link regardless.

    Example 3: `--index-files ''` will reject all directory links because there are
               no valid index files. This will require every link to explicitly name
               a file.

    Note: This option only takes effect on `file://` URIs which exist and point to a directory.

### -m, --max-redirects

```bash
lychee --max-redirects <MAX_REDIRECTS>
```
    Maximum number of allowed redirects

**default**: 5


### --max-cache-age

```bash
lychee --max-cache-age <MAX_CACHE_AGE>
```
    Discard all cached requests older than this duration

**default**: 1d


### --max-concurrency

```bash
lychee --max-concurrency <MAX_CONCURRENCY>
```
    Maximum number of concurrent network requests

**default**: 128


### --max-retries

```bash
lychee --max-retries <MAX_RETRIES>
```
    Maximum number of retries per request

**default**: 3


### --min-tls

```bash
lychee --min-tls <MIN_TLS>
```
    Minimum accepted TLS Version

**possible values**: TLSv1_0, TLSv1_1, TLSv1_2, TLSv1_3


### --mode

```bash
lychee --mode <MODE>
```
    Set the output display mode. Determines how results are presented in the terminal

**default**: color

**possible values**: plain, color, emoji, task


### -n, --no-progress

```bash
lychee --no-progress
```
    Do not show progress bar.
    This is recommended for non-interactive shells (e.g. for continuous integration)

### --no-ignore

```bash
lychee --no-ignore
```
    Do not skip files that would otherwise be ignored by '.gitignore', '.ignore', or the global ignore file

### -o, --output

```bash
lychee --output <OUTPUT>
```
    Output file of status report

### --offline

```bash
lychee --offline
```
    Only check local files and block network requests

### -q, --quiet...

```bash
lychee --quiet...
```
    Less output per occurrence (e.g. `-q` or `-qq`)

### -r, --retry-wait-time

```bash
lychee --retry-wait-time <RETRY_WAIT_TIME>
```
    Minimum wait time in seconds between retries of failed requests

**default**: 1


### --remap

```bash
lychee --remap <REMAP>
```
    Remap URI matching pattern to different URI

### --require-https

```bash
lychee --require-https
```
    When HTTPS is available, treat HTTP links as errors

### --root-dir

```bash
lychee --root-dir <ROOT_DIR>
```
    Root directory to use when checking absolute links in local files. This option is
    required if absolute links appear in local files, otherwise those links will be
    flagged as errors. This must be an absolute path (i.e., one beginning with `/`).

    If specified, absolute links in local files are resolved by prefixing the given
    root directory to the requested absolute link. For example, with a root-dir of
    `/root/dir`, a link to `/page.html` would be resolved to `/root/dir/page.html`.

    This option can be specified alongside `--base-url`. If both are given, an
    absolute link is resolved by constructing a URL from three parts: the domain
    name specified in `--base-url`, followed by the `--root-dir` directory path,
    followed by the absolute link's own path.

### -s, --scheme

```bash
lychee --scheme <SCHEME>
```
    Only test links with the given schemes (e.g. https). Omit to check links with
    any other scheme. At the moment, we support http, https, file, and mailto.

### --skip-missing

```bash
lychee --skip-missing
```
    Skip missing input files (default is to error if they don't exist)

### --suggest

```bash
lychee --suggest
```
    Suggest link replacements for broken links, using a web archive. The web archive can be specified with `--archive`

### -t, --timeout

```bash
lychee --timeout <TIMEOUT>
```
    Website timeout in seconds from connect to response finished

**default**: 20


### -T, --threads

```bash
lychee --threads <THREADS>
```
    Number of threads to utilize. Defaults to number of cores available to the system

### -u, --user-agent

```bash
lychee --user-agent <USER_AGENT>
```
    User agent

**default**: lychee/0.20.1


### -v, --verbose...

```bash
lychee --verbose...
```
    Set verbosity level; more output per occurrence (e.g. `-v` or `-vv`)

### -V, --version

```bash
lychee --version
```
    Print version

### -X, --method

```bash
lychee --method <METHOD>
```
    Request method

**default**: get


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

