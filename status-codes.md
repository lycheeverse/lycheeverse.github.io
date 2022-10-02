## Special Status Codes

Some websites don't respond with a `200` (OK) status code. \ Instead they might
send `204` (No Content), `206` (Partial Content), or [something else
entirely](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/418).

In case you run into such issues you can work around that by providing a custom \
list of accepted status codes, such as `--accept 200,204,206`.
