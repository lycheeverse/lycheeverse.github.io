---
title: How lychee Works
---

## High-Level Overview

Here is a talk explaining the high-level architecture of lychee
and the broader context of link checkers:

<div style=" position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden; margin-bottom: 40px;">
<iframe
style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
src="https://www.youtube.com/embed/BIguvia6AvM"
webkitallowfullscreen mozallowfullscreen allowfullscreen>
</iframe>
</div>

## Asynchronous Architecture

lychee is fully asynchronous.

It reads inputs and extracts links into a [`futures::stream::Stream`](https://docs.rs/futures/latest/futures/stream/trait.Stream.html).
Each link gets filtered by an async pipeline and finally gets sent to a pool of
[reqwest](https://github.com/seanmonstar/reqwest) HTTP clients, which check all links concurrently.

:::note
Due to its asynchronous nature, results get printed in order of response time
of each individual link and _not_ in order of appearance inside input files.
:::

## Extractors

The extractors do all the heavy lifting.
They extract all links from a given input file and return them as a stream.
We want the extractors to be as fast and memory-efficient as possible.

Currently we support three main extractors:

- [Pulldown CMark](https://github.com/raphlinus/pulldown-cmark) for Markdown files
- [html5gum](https://github.com/untitaker/html5gum) for HTML
- [linkify](https://github.com/robinst/linkify) as a fallback for plaintext files and other unknown formats.
