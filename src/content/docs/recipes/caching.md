---
title: Caching
---

Caching can significantly speed up repeated checks by reducing requests to the same URL during consecutive runs. For instance, caching responses from `https://github.com` can decrease the load when checking multiple links. Here's how to cache the results of a lychee run.

## Caching on the command line

To cache the results of a lychee run, you can use the `--cache` flag. This
will save the results to a `.lycheecache` file in the current directory. The
next time you run lychee with the `--cache` flag, it will use the cached
results instead of making a new request.

```bash
lychee --cache --verbose --no-progress './**/*.md' './**/*.html'
```

:::tip
Check out the `.lycheecache` file to see the cached results.
It's just a plaintext file with the URLs and their status codes
as well as a UNIX timestamp per entry, which is used to determine
the cache's age.

The great thing is, that you can remove single lines from the cache
file to re-check the URLs on the next run. It's human-readable and
editable.
:::

## Caching in Docker

If you're running lychee inside a Docker container, caching is still possible,
but a little trickier.

You need to create a volume to cache the results. This way, the results will persist between runs.

:::warning
You need to create the `.lycheecache` file in the current directory before
running the Docker container.
:::

```bash
touch .lycheecache
docker run -it -v $(pwd)/.lycheecache:/.lycheecache lycheeverse/lychee --cache --verbose https://lychee.cli.rs
```

## Caching in GitHub Actions

To see how you can cache the results of a lychee run in GitHub Actions, [check out this page](/github_action_recipes/caching).
