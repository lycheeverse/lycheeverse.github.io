# Migrating Websites

Say you move your website from one domain to another.
How do you know if you missed to migrate any old links? 🤔

You can check that with lychee!

Here's how to check all the links in your sitemap after
migrating your website from `example.com` to `example.org`:

```bash
lychee --remap 'example.com example.org' -- https://example.com/sitemap.xml 
```

Of course you can combine this with other lychee features

```bash
lychee --remap 'example.com example.org' \
       --exclude 'example.org/old' \
       --exclude 'oldmail@example.com' \
       --verbose \
       --no-progress \
       --max-concurrency 4 \
       https://example.com/sitemap.xml 
```

> [!NOTE]
> In the above example we limit the number of concurrent requests to 4 
> to not overload the server.

You can also check the migration on a local `dev` version of your website:

```bash
lychee --remap 'example.com localhost:8000' ...
```

## How does it work?

The `--remap` option takes a list of space-separated pairs of strings.
The first string is the old domain and the second string is the new domain.
The old domain is replaced with the new domain in all links.

You can use this option multiple times to remap multiple domains and you can use
regular expressions.

