---
title: Too Many Redirects
---

At times you might get an error message like this:

```bash
Failed: Too many redirects: error following redirect for url
```

This means that the server is sending redirect responses to lychee, but lychee
is following the redirect too many times.

## Narrow down the issue

To narrow down the issue, you can enable verbose mode by setting the `-vvv` flag
to see the redirect chain:

```bash
echo 'https://example.com' | lychee -vvv
[DEBUG] Redirecting to https://example.com/foo
[DEBUG] Redirecting to https://example.com/bar
[DEBUG] Redirecting to https://example.com/baz
✗ [ERR] https://example.com | Failed: Too many redirects: error following redirect for url

Issues found in 1 input. Find details below.
```

You can then see the redirect chain and see if there is a pattern.
It might help to open the URLs in a browser to see if you can spot the issue.

## Increase the number of maximum redirects

If you can see that the URLs are valid and the redirect chain is not too long,
you can increase the number of maximum redirects by setting
the `--max-redirects` flag to a higher value.

```bash
lychee --max-redirects 10 https://example.com
```

## Bot Protection

If you still face issues, it might be that the server is trying to block lychee.
Maybe the server has bot protection in place and is trying to redirect lychee to
a CAPTCHA page.

To bypass this, you can try to set the `--user-agent` flag to a popular user
agent like curl:

```bash
lychee --user-agent "curl/8.4.0" https://example.com
```

Try from a different IP address or use a VPN to see if the issue persists.

## Whitelist lychee

If you still face issues, you can try to contact the server administrator to see
if they can whitelist lychee.
