---
title: Cookies
---

Some websites require cookies to return the right response. For example, a site
might set a session cookie on the first request and expect it on the next one.
lychee can persist cookies between requests using a cookie jar.

## Using a cookie jar

Pass `--cookie-jar` with a path to a JSON file:

```bash
lychee --cookie-jar cookies.json https://example.com
```

lychee loads existing cookies from the file before checking, stores any cookies
the server sets during the run, and writes them back to the same file when it's
done. If the file doesn't exist yet, lychee creates it.

This means you can run lychee once to collect cookies and reuse them on later
runs by pointing at the same file, which can save some manual work!

## File format

The cookie jar is a plain JSON array. Each entry is a single cookie, serialized
in the format used by the [`cookie_store`](https://docs.rs/cookie_store/latest/cookie_store/struct.Cookie.html)
crate, which lychee uses to manage cookies. Cookie storage and matching follow
the rules of [RFC 6265](https://datatracker.ietf.org/doc/html/rfc6265):

```json
[
  {
    "raw_cookie": "session=abc123; Secure; Path=/; Domain=example.com; Expires=Tue, 03 Aug 2100 00:38:37 GMT",
    "path": ["/", true],
    "domain": { "Suffix": "example.com" },
    "expires": { "AtUtc": "2100-08-03T00:38:37Z" }
  }
]
```

The fields are:

- `raw_cookie`: the full [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) string.
- `path`: the cookie path, plus whether it was set explicitly (`true`) or defaulted from the request URL (`false`).
- `domain`: `{ "Suffix": "example.com" }` for a `Domain=` cookie (matches subdomains too), `{ "HostOnly": "example.com" }` for an exact host, or `"NotPresent"`.
- `expires`: `{ "AtUtc": "2100-08-03T00:38:37Z" }` for a fixed expiry, or `"SessionEnd"` for session cookies.

The `raw_cookie` string and the other fields overlap because that's how the
`cookie_store` crate represents a cookie: it keeps the original `Set-Cookie`
header alongside the `path`, `domain`, and `expires` values it parsed out of it.
Those parsed fields are what it uses to decide whether a cookie applies to a
given request, following RFC 6265.

:::caution
This format is not a stable API and may change between lychee releases. If you
depend on the file layout, check the [release notes](https://github.com/lycheeverse/lychee/releases)
when upgrading.
:::

:::note
Only unexpired, persistent cookies are written back, so session cookies and
expired ones won't appear in the saved file.

When editing the file by hand, keep each entry in the format shown above, since
lychee parses it back into the same structure. If lychee cannot parse the file's
contents, it reports an error and aborts rather than ignoring the bad entries.
:::
