---
title: Docker
---

<div>
    <a href="https://hub.docker.com/r/lycheeverse/lychee">
        <img src="https://img.shields.io/docker/pulls/lycheeverse/lychee?color=%23099cec&logo=Docker" alt="Docker Pulls Badge" />
    </a>
</div>

If you can't or don't want to install lychee locally, **you can use Docker
instead** 🐳.

We provide a handy official image over at [lycheeverse/lychee](https://hub.docker.com/r/lycheeverse/lychee),
which gets automatically updated on every release.

To check files on your local machine, you need to mount them into the Docker
container.

Here's how to do that:

```bash
docker run --init -it -v `pwd`:/input lycheeverse/lychee /input/README.md
```

The `--init` parameter is passed so that lychee can be stopped
from the terminal. We also pass `-it` to start an interactive terminal, which
is required to show the progress bar.

Once you're inside the Docker container, use lychee as usual, e.g.

```bash
lychee .
```
