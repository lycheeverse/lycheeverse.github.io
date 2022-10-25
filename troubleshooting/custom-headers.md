# Website Expects Custom Headers

Some sites expect one or more custom headers to return a valid response. \
For example, crates.io expects a `Accept: text/html` header or else it \
will [return a 404](https://github.com/rust-lang/crates.io/issues/788).

To fix that you can pass additional headers like so: `--headers "accept=text/html"`. \
You can use that argument multiple times to add more headers. \
Or, you can accept all content/MIME types: `--headers "accept=*/*"`.

See more info about the Accept header
[over at MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept).
