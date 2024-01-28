---
title: Docker
---

If you can't or don't want to install lychee locally, **you can use Docker
instead** 🐳.

<a href="https://hub.docker.com/r/lycheeverse/lychee">
<img src="https://img.shields.io/docker/pulls/lycheeverse/lychee?color=%23099cec&logo=Docker" alt="Docker Pulls Badge" />
</a>

We provide a handy official image over at [lycheeverse/lychee](https://hub.docker.com/r/lycheeverse/lychee),
which gets automatically updated on every release.

## Mounting Files Into Docker Image

Here's how to mount a local directory into the container and check some input
with lychee. The `--init` parameter is passed so that lychee can be stopped
from the terminal. We also pass `-it` to start an interactive terminal, which
is required to show the progress bar.

```bash
docker run --init -it -v `pwd`:/input lycheeverse/lychee /input/README.md
```

Once you're inside the Docker container, use lychee as usual, e.g.

```bash
lychee .
```
