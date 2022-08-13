## GitHub Rate Limiting

GitHub has a quite aggressive rate limiter.
If you're seeing errors like

```
GitHub token not specified. To check GitHub links reliably, use `--github-token`
flag / `GITHUB_TOKEN` env var.
```

it means **you're getting rate-limited** 😐. As per the message, you can make lychee
use a GitHub personal access token to circumvent this.

The token can be generated in your GitHub account settings page. A personal
token with no extra permissions is enough to be able to check public repos
links.

You can optionally set an environment variable with your Github token like so
`GITHUB_TOKEN=xxxx`, or use the `--github-token` CLI option. It can also be set
in the config file. [Here is an example config file][config-file].

For more details, see ["GitHub token" section in
README.md](https://github.com/lycheeverse/lychee#github-token).

[config-file]: https://github.com/lycheeverse/lychee/blob/master/lychee.example.toml
