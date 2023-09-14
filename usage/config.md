# Configuration File

The configuration file is a [TOML](https://toml.io) file that can be used to specify the options that are also available on the command line.
It comes in handy when you want to specify a lot of options, or when you want to configure lychee for continuous integration as part of a repository (configuration as code).

The configuration file is optional and can be specified with the `--config` option.

```bash
lychee --config ./lychee.toml
```

The configuration file is also used to specify the default values for the options that are also available on the command line.

For example, the default value for the `--timeout` option is `20` seconds. If you want to change this value, you can do so in the configuration file.

```toml
timeout = 30
```

## Default Location of the Configuration File

`./lychee.toml` (in the current working directory) is used if no other configuration file is specified.
Here is an example of a configuration file.
Please find the [latest version on Github](https://github.com/lycheeverse/lychee/blob/master/lychee.example.toml).

```toml
#############################  Display  #############################

# Verbose program output
verbose = false

# Don't show interactive progress bar while checking links.
no_progress = false

# Path to summary output file.
output = "report.md"

#############################  Cache  ###############################

# Enable link caching. This can be helpful to avoid checking the same links on
# multiple runs.
cache = true

# Discard all cached requests older than this duration.
max_cache_age = "2d"

#############################  Runtime  #############################

# Number of threads to utilize.
# Defaults to number of cores available to the system if omitted.
threads = 2

# Maximum number of allowed redirects.
max_redirects = 10

# Maximum number of allowed retries before a link is declared dead.
max_retries = 2

# Maximum number of concurrent link checks.
max_concurrency = 14

#############################  Requests  ############################

# User agent to send with each request.
user_agent = "curl/7.83. 1"

# Website timeout from connect to response finished.
timeout = 20

# Minimum wait time in seconds between retries of failed requests.
retry_wait_time = 2

# Comma-separated list of accepted status codes for valid links.
accept = [200, 429]

# Proceed for server connections considered insecure (invalid TLS).
insecure = false

# Only test links with the given schemes (e.g. https).
# Omit to check links with any other scheme.
# At the moment, we support http, https, file, and mailto.
scheme = [ "https" ]

# When links are available using HTTPS, treat HTTP links as errors.
require_https = false

# Request method
method = "get"

# Custom request headers
headers = []

# Remap URI matching pattern to different URI.
# This also supports (named) capturing groups.
remap = [
    "https://example.com http://example.invalid",
    "https://example.com/(.*) http://example.org/$1",
    "https://github.com/(?P<org>.*)/(?P<repo>.*) https://gitlab.com/$org/$repo",
]

# Base URL or website root directory to check relative URLs.
base = "https://example.com"

# HTTP basic auth support. This will be the username and password passed to the
# authorization HTTP header. See
# <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization>
basic_auth = "user:pwd"

#############################  Exclusions  ##########################

# Skip missing input files (default is to error if they don't exist).
skip_missing = false

# Check links inside `<code>` and `<pre>` blocks as well as Markdown code
# blocks.
include_verbatim = false

# Ignore case of paths when matching glob patterns.
glob_ignore_case = false

# Exclude URLs and mail addresses from checking (supports regex).
exclude = [ '.*\.github.com\.*' ]

# Exclude these filesystem paths from getting checked.
exclude_path = ["file/path/to/Ignore", "./other/file/path/to/Ignore"]

# URLs to check (supports regex). Has preference over all excludes.
include = [ 'gist\.github\.com.*' ]

# Exclude all private IPs from checking.
# Equivalent to setting `exclude_private`, `exclude_link_local`, and
# `exclude_loopback` to true.
exclude_all_private = false

# Exclude private IP address ranges from checking.
exclude_private = false

# Exclude link-local IP address range from checking.
exclude_link_local = false

# Exclude loopback IP address range and localhost from checking.
exclude_loopback = false

# Exclude all mail addresses from checking.
exclude_mail = false
```
