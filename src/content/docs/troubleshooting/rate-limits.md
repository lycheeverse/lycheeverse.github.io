---
title: Rate Limits
description: A guide in my new Starlight docs site.
---

:::note
When checking many links from a single website, chances are you will get
rate limited at some point. The result is that lychee will report a lot of broken
links with `429` as a status code.
Below you'll find some ideas to mitigate that scenario.
:::

## Limit The Number Of Retries

If lychee hits a `429`, it will retry the request (after some exponential backoff).
With many concurrent requests to the same site, this increases the chances of getting rate limited.
(See also [Thundering herd problem](https://en.wikipedia.org/wiki/Thundering_herd_problem).)

To avoid that, set the number of retries to 0: `--max-retries 0`.

## Reduce The Number Of Concurrent Requests

You can limit the total number of concurrent requests with `--max-concurrency`. This
way you can give the remote server some time to breath in-between requests and
reduce the risk of getting rate-limited. Note that this will slow down execution
in general, though, so you should play around with different values.

## Accept `429` Status Code

As a last resort, you might want to accept `429` as a valid status code.
This way, rate limiting issues won't get reported.

You can either set it as a command-line argument (`--accept 200,429`) or through
the `lychee.toml`:

```toml
accept = [429, 200]
```

## GitHub Rate Limiting

GitHub has a quite aggressive rate limiter.
When you come across errors like

```bash
GitHub token not specified. To check GitHub links reliably, use `--github-token`
flag / `GITHUB_TOKEN` env var.
```

it means **you're getting rate-limited** 😐. As per the message, you can make lychee
use a GitHub personal access token to circumvent this.

:::tip
When using `GITHUB_TOKEN`, the rate limit is **1,000 requests per hour per repository**.
For requests to resources that belong to an enterprise account on GitHub.com,
GitHub Enterprise Cloud's rate limit applies, and the limit is 15,000 requests
per hour per repository. ([Source](https://docs.github.com/en/developers/apps/building-github-apps/rate-limits-for-github-apps))
So using a token can greatly increase the number of requests you can make! 🚀
:::

You can optionally set an environment variable with your Github token like so
`GITHUB_TOKEN=xxxx`, or use the `--github-token` CLI option. It can also be set
in the config file. [Here is an example config file](https://github.com/lycheeverse/lychee/blob/master/lychee.example.toml).

The token can be generated in your
[GitHub account settings page](https://github.com/settings/tokens). A personal token with no extra
permissions is enough to be able to check public repos links.

## Exclude Entire Website When Getting Rate-Limited

Sometimes you encounter a website with a particularly stringent rate-limiting
policy and none of the suggestions work.
In that case you can exclude it from getting checked altogether. Example: `--exclude example.com`.

## Cache the Results

If the `--cache` flag is used, this can also help to reduce the amount of calls
that are sent to a page because only links that exceed the cache age are queried
again. This value can be adjusted with `--max-cache-age`, e.g. `12h`.
