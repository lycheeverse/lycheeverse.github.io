# Docker

If you don't want to install lychee locally, **you can use Docker instead** 🐳.

We provide a handy official image over at [lycheeverse/lychee](docker-image),
which gets automatically updated on every release.

## Mounting Files Into Docker Image <!-- {docsify-ignore} -->

Here's how to mount a local directory into the container and check some input
with lychee. The `--init` parameter is passed so that lychee can be stopped
from the terminal. We also pass `-it` to start an interactive terminal, which
is required to show the progress bar.

```sh
docker run --init -it -v `pwd`:/input lycheeverse/lychee /input/README.md
```

Once you're inside the Docker container, use lychee as usual, e.g.

```
lychee .
```

[docker-image]: https://hub.docker.com/repository/docker/lycheeverse/lychee
