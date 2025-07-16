---
title: Network Errors
---

If you run lychee and some links fail with the following error messages:

```bash
Failed: Network error: error sending request for url
```

or

```bash
Network error: Forbidden
```

then it could be certificate-related issue.
Certificates are used to verify the identity of a website and to establish a secure connection.
Different operating systems and tools have different ways to handle certificates.

If lychee is unable to verify the certificate of a website, it will show a
network error. This could be due to an expired certificate, an invalid
certificate, or a certificate from an unknown authority.

## What now?

### Double-check with a different tool

Try using a different tool like [`curl`](https://curl.se/):

```bash
curl https://example.com
```

If this works, then the issue is with lychee and not the website.
In that case, please open an issue on the lychee GitHub repository.

If it doesn't work, then the issue is with the website or your system.
It might be related to the certificate or the user agent. The site might also use a bot detection such as Cloudflare Bot Management. Read on to find out more.

### Use the `--insecure` flag

You can use the `--insecure` flag to ignore certificate errors:

```bash
lychee --insecure https://example.com
```

If this works, then the issue is with the certificate.
If it doesn't work, the issue might be with lychee or the website.
Please follow the steps below to narrow down the issue further.

### Try a different user agent

You can try using a different user agent:

```bash
lychee --user-agent "curl/8.4.0" https://example.com
```

If this works, then the website might be blocking lychee or any other user agent
that it doesn't recognize. There's little you can do in this case, except to
contact the website administrator and ask them to whitelist lychee or keep the
user agent as `curl`, which is a popular user agent.

If you'd like to emulate your local `curl` user agent, you can run:

```bash
curl -s https://httpbin.org/user-agent
```

This will show you the user agent that curl uses on your system.

### Cloudflare Bot Management and other bot detection

Some websites use bot detection services like Cloudflare Bot Management to
prevent automated tools from accessing their content.
Unfortunately, this includes lychee, even though it does not scrape the website.

To check if the website is using Cloudflare Bot Management, you can
use a service like [BuiltWith](https://builtwith.com/). Just enter the website
URL and check if it uses any bot detection services like Cloudflare Bot Management or
Cloudflare Challenge.

If the website uses a bot detection service, which is blocking lychee, there's
little you can do. You can try contacting the website administrator and ask them
to whitelist lychee.

### Update the CA certificates

To resolve certificate-related issues, you can update the CA certificates on
your system. (CA stands for Certificate Authority and is an entity that issues
digital certificates. It's what your browser uses to verify the identity of a
website.)

If you're on a Debian-based system (including Ubuntu), you can update the
certificates by running:

```
sudo apt-get install ca-certificates
```

For other systems, you can follow the instructions below:

- [macOS](https://support.apple.com/en-us/103272)
- [Windows](https://learn.microsoft.com/en-us/skype-sdk/sdn/articles/installing-the-trusted-root-certificate)
- [Arch Linux](https://wiki.archlinux.org/title/Transport_Layer_Security)

Also, see this [Stack Overflow
discussion](https://stackoverflow.com/a/24618403/270334) for additional
information.

After that, try running lychee again.

### Related lychee issues

If all of the above steps don't work, it might be a known issue with lychee.
To find more information about this issue, check out the following issues:

- [lychee shows network error: forbidden for valid links](https://github.com/lycheeverse/lychee/issues/733)
- [Failed: Network error: error sending request for url](https://github.com/lycheeverse/lychee/issues/1487)

or search for similar issues on the lychee GitHub repository.

If you can't find an issue that matches your problem, you can open a new issue
on the lychee GitHub repository.
