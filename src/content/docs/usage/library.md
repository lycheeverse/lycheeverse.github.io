---
title: Library Usage
description: A guide in my new Starlight docs site.
---

You can use lychee as a library for your own projects!
Here is a "hello world" example:

```rust
use lychee_lib::Result;

#[tokio::main]
async fn main() -> Result<()> {
  let response = lychee_lib::check("https://github.com/lycheeverse/lychee").await?;
  println!("{response}");
  Ok(())
}
```

This is equivalent to the following snippet, in which we build our own client:

```rust
use lychee_lib::{ClientBuilder, Result, Status};

#[tokio::main]
async fn main() -> Result<()> {
  let client = ClientBuilder::default().client()?;
  let response = client.check("https://github.com/lycheeverse/lychee").await?;
  assert!(response.status().is_success());
  Ok(())
}
```

The client builder is very customizable:

```rust
let client = lychee_lib::ClientBuilder::builder()
    .includes(includes)
    .excludes(excludes)
    .max_redirects(cfg.max_redirects)
    .user_agent(cfg.user_agent)
    .allow_insecure(cfg.insecure)
    .custom_headers(headers)
    .method(method)
    .timeout(timeout)
    .github_token(cfg.github_token)
    .scheme(cfg.scheme)
    .accepted(accepted)
    .build()
    .client()?;
```

All options that you set will be used for all link checks.
See the [builder
documentation](https://docs.rs/lychee-lib/latest/lychee_lib/struct.ClientBuilder.html)
for all options. For more information, check out the [examples] folder.

[examples]: https://github.com/lycheeverse/lychee/tree/master/examples
