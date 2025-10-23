---
title: Library Usage
description: Use lychee as a library in your Rust projects to integrate link checking into your applications.
---

You can use lychee as a library for your own projects!
The documentation for the library can be found [here](https://docs.rs/lychee-lib).

Here is a "hello world" example:

```rust title="main.rs"
use lychee_lib::Result;

#[tokio::main]
async fn main() -> Result<()> {
  let response = lychee_lib::check("https://github.com/lycheeverse/lychee").await?;
  println!("{response}");
  Ok(())
}
```

This is equivalent to the following snippet, in which we build our own client:

```rust title="main.rs"
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

```rust title="main.rs"
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
