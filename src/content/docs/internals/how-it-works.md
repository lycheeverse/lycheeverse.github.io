---
title: How lychee Works
description: Technical overview of lychee's asynchronous architecture, link extraction, and concurrent processing pipeline.
---

## High-Level Overview

This talk explains lychee's high-level architecture and the broader context of link checkers:

<div style=" position: relative; padding-bottom: 56.25%; padding-top: 30px; height: 0; overflow: hidden; margin-bottom: 40px;">
<iframe
style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
src="https://www.youtube.com/embed/BIguvia6AvM"
webkitallowfullscreen mozallowfullscreen allowfullscreen>
</iframe>
</div>

## Asynchronous Architecture

lychee is fully asynchronous, enabling high-performance concurrent link checking.

The pipeline:

1. **Input Reading**: Files are read and parsed asynchronously
2. **Link Extraction**: Links are extracted into a [`futures::stream::Stream`](https://docs.rs/futures/latest/futures/stream/trait.Stream.html)
3. **Filtering**: Each link passes through an async filter pipeline
4. **Concurrent Checking**: Filtered links are sent to a pool of [reqwest](https://github.com/seanmonstar/reqwest) HTTP clients that check all links concurrently

:::note
Results are printed in order of response time, not in order of appearance in input files. This is due to the asynchronous nature of the link checking process.
:::

## Link Extractors

Extractors handle link discovery from different file formats. They're optimized for speed and memory efficiency.

### Supported Extractors

**Markdown**: [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark)
- Pull parser for CommonMark
- Fast, memory-efficient parsing
- Handles Markdown-specific link syntax

**HTML**: [html5gum](https://github.com/untitaker/html5gum)
- WHATWG-compliant HTML5 tokenizer
- Tag soup parser for malformed HTML
- Handles real-world HTML reliably

**Plaintext/Fallback**: [linkify](https://github.com/robinst/linkify)
- Finds URLs and email addresses in plain text
- Handles surrounding punctuation correctly
- Used for unknown file formats

## Concurrency Model

lychee uses Rust's async runtime (tokio) to manage concurrent operations efficiently. The default concurrency is 128 simultaneous requests, configurable via `--max-concurrency`.

This allows lychee to check thousands of links in seconds while maintaining low memory usage.
