# How It Works

## High-Level Overview

lychee is fully asynchronous.

It reads inputs and extracts links into a [`futures::stream::Stream`][stream].
Each link gets filtered by an async pipeline and finally gets sent to a pool of
[reqwest] HTTP clients, which checks all links concurrently.

> Note: As a consequence results get printed in order of response time of each
> individual link and not in order of appearance inside input files.

## Extractors

The extractors do all the heavy lifting.
They extract all links from a given input file and return them as a stream.
We want the extractors to be as fast and memory-efficient as possible.

Currently we maintain three main extractors:

- [Pulldown CMark](https://github.com/raphlinus/pulldown-cmark) for Markdown files
- [html5gum](https://github.com/untitaker/html5gum) for HTML
- [linkify](https://github.com/robinst/linkify) as a fallback for plaintext files and other unknown formats.

[stream]: https://docs.rs/futures/latest/futures/stream/trait.Stream.html
[reqwest]: https://github.com/seanmonstar/reqwest
