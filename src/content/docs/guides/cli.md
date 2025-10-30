---
title: CLI
---

## Usage

```bash
lychee [OPTIONS] <inputs>...
```

### Arguments

**`<inputs>...`**

The inputs (where to get links to check from). These can be:

- Files (e.g. `README.md`)
- File globs (e.g. `"~/git/*/README.md"`)
- Remote URLs (e.g. `https://example.com/README.md`)
- Standard input (`-`)

:::note
Use `--` to separate inputs from options that allow multiple arguments.
:::

## General Options

### `--config` / `-c`

Configuration file to use.

**Default:** `lychee.toml`

```bash
lychee --config custom-config.toml
```

### `--verbose` / `-v`

Set verbosity level; more output per occurrence (e.g. `-v` or `-vv`).

```bash
lychee -vv README.md
```

### `--quiet` / `-q`

Less output per occurrence (e.g. `-q` or `-qq`).

```bash
lychee -qq README.md
```

### `--no-progress` / `-n`

Do not show progress bar. This is recommended for non-interactive shells (e.g. for continuous integration).

```bash
lychee --no-progress README.md
```

### `--help` / `-h`

Print help information (use `-h` for a summary).

### `--version` / `-V`

Print version information.

## Input Options

### `--extensions`

Test the specified file extensions for URIs when checking files locally.

Multiple extensions can be separated by commas. Note that if you want to check filetypes which have multiple extensions, e.g. HTML files with both `.html` and `.htm` extensions, you need to specify both extensions explicitly.

**Default:** `md,mkd,mdx,mdown,mdwn,mkdn,mkdown,markdown,html,htm,txt`

```bash
lychee --extensions md,html,txt
```

### `--skip-missing`

Skip missing input files (default is to error if they don't exist).

```bash
lychee --skip-missing file1.md file2.md
```

### `--no-ignore`

Do not skip files that would otherwise be ignored by `.gitignore`, `.ignore`, or the global ignore file.

```bash
lychee --no-ignore .
```

### `--hidden`

Do not skip hidden directories and files.

```bash
lychee --hidden .
```

### `--glob-ignore-case`

Ignore case when expanding filesystem path glob inputs.

```bash
lychee --glob-ignore-case "**/*.MD"
```

### `--dump`

Don't perform any link checking. Instead, dump all the links extracted from inputs that would be checked.

```bash
lychee --dump README.md
```

### `--dump-inputs`

Don't perform any link extraction and checking. Instead, dump all input sources from which links would be collected.

```bash
lychee --dump-inputs "docs/**/*.md"
```

## Caching Options

### `--cache`

Use request cache stored on disk at `.lycheecache`.

```bash
lychee --cache README.md
```

### `--max-cache-age`

Discard all cached requests older than this duration.

**Default:** `1d`

```bash
lychee --cache --max-cache-age 7d README.md
```

### `--cache-exclude-status`

A list of status codes that will be ignored from the cache.

The following exclude range syntax is supported: `[start]..[[=]end]|code`

Valid examples:

- `429` (excludes the 429 status code only)
- `500..` (excludes any status code >= 500)
- `..100` (excludes any status code < 100)
- `500..=599` (excludes any status code from 500 to 599 inclusive)
- `500..600` (excludes any status code from 500 to 600 excluding 600, same as 500..=599)

```bash
lychee --cache --cache-exclude-status '429, 500..502' README.md
```

## Network Options

### `--max-redirects` / `-m`

Maximum number of allowed redirects.

**Default:** `5`

```bash
lychee --max-redirects 10 README.md
```

### `--max-retries`

Maximum number of retries per request.

**Default:** `3`

```bash
lychee --max-retries 5 README.md
```

### `--retry-wait-time` / `-r`

Minimum wait time in seconds between retries of failed requests.

**Default:** `1`

```bash
lychee --retry-wait-time 5 README.md
```

### `--timeout` / `-t`

Website timeout in seconds from connect to response finished.

**Default:** `20`

```bash
lychee --timeout 30 README.md
```

### `--max-concurrency`

Maximum number of concurrent network requests.

**Default:** `128`

```bash
lychee --max-concurrency 64 README.md
```

### `--threads` / `-T`

Number of threads to utilize. Defaults to number of cores available to the system.

```bash
lychee --threads 4 README.md
```

### `--user-agent` / `-u`

User agent string to use for requests.

**Default:** `lychee/0.20.1`

```bash
lychee --user-agent "Mozilla/5.0" README.md
```

### `--insecure` / `-i`

Proceed for server connections considered insecure (invalid TLS).

```bash
lychee --insecure README.md
```

### `--min-tls`

Minimum accepted TLS Version.

**Possible values:** `TLSv1_0`, `TLSv1_1`, `TLSv1_2`, `TLSv1_3`

```bash
lychee --min-tls TLSv1_2 README.md
```

### `--method` / `-X`

Request method to use.

**Default:** `get`

```bash
lychee --method head README.md
```

### `--offline`

Only check local files and block network requests.

```bash
lychee --offline README.md
```

## Authentication Options

### `--header` / `-H`

Set custom header for requests.

Some websites require custom headers to be passed in order to return valid responses. You can specify custom headers in the format `'Name: Value'`. For example, `'Accept: text/html'`. This is the same format that other tools like curl or wget use. Multiple headers can be specified by using the flag multiple times.

```bash
lychee --header "Accept: text/html" --header "Authorization: Bearer token" README.md
```

### `--basic-auth`

Basic authentication support.

Format: `http://example.com username:password`

```bash
lychee --basic-auth "http://example.com user:pass" README.md
```

### `--github-token`

GitHub API token to use when checking github.com links, to avoid rate limiting.

**Environment variable:** `GITHUB_TOKEN`

```bash
lychee --github-token ghp_xxxxxxxxxxxx README.md
# or
export GITHUB_TOKEN=ghp_xxxxxxxxxxxx
lychee README.md
```

### `--cookie-jar`

Tell lychee to read cookies from the given file. Cookies will be stored in the cookie jar and sent with requests. New cookies will be stored in the cookie jar and existing cookies will be updated.

```bash
lychee --cookie-jar cookies.txt README.md
```

## Filter Options

### `--scheme` / `-s`

Only test links with the given schemes (e.g. https). Omit to check links with any other scheme.

Supported schemes: `http`, `https`, `file`, `mailto`

```bash
lychee --scheme https README.md
lychee --scheme http https file -- README.md
```

:::note
If you don't specify any schemes, lychee will check all links regardless of their scheme. Otherwise, it will only check links with the specified schemes.
:::

### `--include`

URLs to check (supports regex). Has preference over all excludes.

```bash
lychee --include "https://example.com.*" README.md
```

### `--exclude`

Exclude URLs and mail addresses from checking. The values are treated as regular expressions.

```bash
lychee --exclude "https://example.com" --exclude "mailto:.*" README.md
```

### `--exclude-path`

Exclude paths from getting checked. The values are treated as regular expressions.

```bash
lychee --exclude-path "node_modules" --exclude-path "vendor" .
```

### `--exclude-file`

:::caution[Deprecated]
Use `--exclude-path` instead.
:::

### `--exclude-all-private` / `-E`

Exclude all private IPs from checking. Equivalent to `--exclude-private --exclude-link-local --exclude-loopback`.

```bash
lychee --exclude-all-private README.md
```

### `--exclude-private`

Exclude private IP address ranges from checking.

```bash
lychee --exclude-private README.md
```

### `--exclude-link-local`

Exclude link-local IP address range from checking.

```bash
lychee --exclude-link-local README.md
```

### `--exclude-loopback`

Exclude loopback IP address range and localhost from checking.

```bash
lychee --exclude-loopback README.md
```

### `--include-mail`

Also check email addresses.

```bash
lychee --include-mail README.md
```

### `--include-fragments`

Enable the checking of fragments in links (e.g., checking if `#section` exists on a page).

```bash
lychee --include-fragments README.md
```

### `--include-verbatim`

Find links in verbatim sections like `pre`- and `code` blocks.

```bash
lychee --include-verbatim README.md
```

### `--include-wikilinks`

Check WikiLinks in Markdown files.

```bash
lychee --include-wikilinks README.md
```

## Status Code Options

### `--accept` / `-a`

A list of accepted status codes for valid links.

The following accept range syntax is supported: `[start]..[[=]end]|code`

Valid examples:

- `200` (accepts the 200 status code only)
- `..204` (accepts any status code < 204)
- `..=204` (accepts any status code <= 204)
- `200..=204` (accepts any status code from 200 to 204 inclusive)
- `200..205` (accepts any status code from 200 to 205 excluding 205, same as 200..=204)

**Default:** `100..=103,200..=299`

```bash
lychee --accept '200..=204, 429, 500' README.md
```

### `--require-https`

When HTTPS is available, treat HTTP links as errors.

```bash
lychee --require-https README.md
```

## URL Transformation Options

### `--base-url` / `-b`

Base URL used to resolve relative URLs during link checking.

```bash
lychee --base-url https://example.com docs/
```

### `--base`

:::caution[Deprecated]
Use `--base-url` instead.
:::

### `--root-dir`

Root path to use when checking absolute local links. Must be an absolute path.

```bash
lychee --root-dir /home/user/project docs/
```

### `--remap`

Remap URI matching pattern to different URI.

```bash
lychee --remap "https://old.example.com https://new.example.com" README.md
```

### `--fallback-extensions`

When checking locally, attempts to locate missing files by trying the given fallback extensions. Multiple extensions can be separated by commas. Extensions will be checked in order of appearance.

:::note
This option only takes effect on `file://` URIs which do not exist.
:::

```bash
lychee --fallback-extensions html,htm,php,asp README.md
```

### `--index-files`

When checking locally, resolves directory links to a separate index file. The argument is a comma-separated list of index file names to search for. Index names are relative to the link's directory and attempted in the order given.

If `--index-files` is specified, then at least one index file must exist in order for a directory link to be considered valid. Additionally, the special name `.` can be used in the list to refer to the directory itself.

If unspecified (the default behavior), index files are disabled and directory links are considered valid as long as the directory exists.

:::note
This option only takes effect on `file://` URIs which exist and point to a directory.
:::

**Examples:**

```bash
# Looks for index.html or readme.md and requires that at least one exists
lychee --index-files index.html,readme.md docs/

# Will use index.html if it exists, but still accept the directory link regardless
lychee --index-files index.html,. docs/

# Will reject all directory links because there are no valid index files
lychee --index-files '' docs/
```

## Web Archive Options

### `--archive`

Specify the use of a specific web archive. Can be used in combination with `--suggest`.

**Possible values:** `wayback`

```bash
lychee --archive wayback --suggest README.md
```

### `--suggest`

Suggest link replacements for broken links, using a web archive. The web archive can be specified with `--archive`.

```bash
lychee --suggest README.md
```

## Output Options

### `--output` / `-o`

Output file of status report.

```bash
lychee --output report.txt README.md
```

### `--format` / `-f`

Output format of final status report.

**Default:** `compact`

**Possible values:** `compact`, `detailed`, `json`, `markdown`, `raw`

```bash
lychee --format json --output report.json README.md
```

### `--mode`

Set the output display mode. Determines how results are presented in the terminal.

**Default:** `color`

**Possible values:** `plain`, `color`, `emoji`, `task`

```bash
lychee --mode emoji README.md
```

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

