# Command Line Options

lychee supports a lot of command line options.
You can see all of them by running `lychee --help`.

Below is the full list of options with a short description.

## Options

```text
USAGE:
    lychee [FLAGS] [OPTIONS] <inputs>...

FLAGS:
        --cache                  Use request cache stored on disk at `.lycheecache`
        --dump                   Don't perform any link checking. Instead, dump all the links extracted from inputs that
                                 would be checked
    -E, --exclude-all-private    Exclude all private IPs from checking.
                                 Equivalent to `--exclude-private --exclude-link-local --exclude-loopback`
        --exclude-link-local     Exclude link-local IP address range from checking
        --exclude-loopback       Exclude loopback IP address range and localhost from checking
        --exclude-mail           Exclude all mail addresses from checking
        --exclude-private        Exclude private IP address ranges from checking
        --glob-ignore-case       Ignore case when expanding filesystem path glob inputs
        --help                   Prints help information
        --include-verbatim       Find links in verbatim sections like `pre`- and `code` blocks
    -i, --insecure               Proceed for server connections considered insecure (invalid TLS)
    -n, --no-progress            Do not show progress bar.
                                 This is recommended for non-interactive shells (e.g. for continuous integration)
        --offline                Only check local files and block network requests
        --require-https          When HTTPS is available, treat HTTP links as errors
        --skip-missing           Skip missing input files (default is to error if they don't exist)
    -V, --version                Prints version information
    -v, --verbose                Verbose program output

OPTIONS:
    -a, --accept <accept>                      Comma-separated list of accepted status codes for valid links
    -b, --base <base>                          Base URL or website root directory to check relative URLs e.g.
                                               https://example.com or `/path/to/public`
        --basic-auth <basic-auth>              Basic authentication support. E.g. `username:password`
    -c, --config <config-file>                 Configuration file to use [default: ./lychee.toml]
        --exclude <exclude>...                 Exclude URLs from checking (supports regex)
        --exclude-file <exclude-file>...       Deprecated; use `--exclude-path` instead
        --exclude-path <exclude-path>...       Exclude file path from getting checked
    -f, --format <format>                      Output format of final status report (compact, detailed, json, markdown)
                                               [default: compact]
        --github-token <github-token>          GitHub API token to use when checking github.com links, to avoid rate
                                               limiting [env: GITHUB_TOKEN]
    -h, --headers <headers>...                 Custom request headers
        --include <include>...                 URLs to check (supports regex). Has preference over all excludes
        --max-cache-age <max-cache-age>        Discard all cached requests older than this duration [default: 1d]
        --max-concurrency <max-concurrency>    Maximum number of concurrent network requests [default: 128]
    -m, --max-redirects <max-redirects>        Maximum number of allowed redirects [default: 5]
        --max-retries <max-retries>            Maximum number of retries per request [default: 3]
    -X, --method <method>                      Request method [default: get]
    -o, --output <output>                      Output file of status report
        --remap <remap>...                     Remap URI matching pattern to different URI
    -r, --retry-wait-time <retry-wait-time>    Minimum wait time in seconds between retries of failed requests [default:
                                               1]
    -s, --scheme <scheme>...                   Only test links with the given schemes (e.g. http and https)
    -T, --threads <threads>                    Number of threads to utilize. Defaults to number of cores available to
                                               the system
    -t, --timeout <timeout>                    Website timeout in seconds from connect to response finished [default:
                                               20]
    -u, --user-agent <user-agent>              User agent [default: lychee/0.10.1]

ARGS:
    <inputs>...    The inputs (where to get links to check from). These can be: files (e.g. `README.md`), file globs
                   (e.g. `"~/git/*/README.md"`), remote URLs (e.g. `https://example.com/README.md`) or standard
                   input (`-`). NOTE: Use `--` to separate inputs from options that allow multiple arguments

```

> [!NOTE]
> Most of the options (like `--scheme` or `--exclude`) are for **links inside inputs**,
> and **not** for the filtering the inputs themselves.

## Repeating Options

Options marked with `...` can be specified multiple times.
For example, `--exclude` can be specified multiple times to exclude multiple URLs.
This is also true for `--headers`, `--include`, `--remap`, `--scheme`, and `--exclude-path`.

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

> [!ATTENTION]
> If you use the shorthand notation you need to separate the options from the inputs with `--`.  
> Otherwise, the options will be interpreted as inputs!
