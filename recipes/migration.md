# Migrating Websites

Say you move your website from one domain to another.
How do you know if you missed to migrate any old links? 🤔

You can check that with lychee!

Here's how to check all the links in your sitemap after
migrating your website from `example.com` to `example.org`:

```bash
lychee --remap 'example.com example.org' -- https://example.com/sitemap.xml 
```

The `--remap` option takes a list of space-separated pairs of strings.
The first string is the old URL pattern and the second string is the new URL pattern.
In this example, the old domain is replaced with the new domain in all links.

You can use this option multiple times to remap multiple domains and you can use
regular expressions.

You can also check the migration on a local `dev` version of your website:

```bash
lychee --remap 'example.com localhost:8000' ...
```

Of course you can also combine this with other lychee features.  
In the below example we limit the number of concurrent requests to 4 to not
overload the server.

```bash
lychee --remap 'example.com example.org' \
       --exclude 'example.org/old' \
       --exclude 'oldmail@example.com' \
       --verbose \
       --no-progress \
       --max-concurrency 4 \
       https://example.com/sitemap.xml 
```

Remap is a powerful feature.
Instead of just replacing domains, you can also use regular expressions to
replace parts of the URL.

For example, if you want to migrate from GitHub to GitLab, you can use this
command:

```bash
lychee --remap 'github.com/(.*) gitlab.com/$1' ...
```

This will replace all links from `github.com` to `gitlab.com` while keeping the
rest of the URL intact.

You can also use named capture groups to replace parts of the URL with a
different name:

```bash
lychee --remap 'github.com/(?P<org>.*)/(?P<repo>.*) gitlab.com/$org/$repo' ...
```

For more information about the `--remap` option, see [#620](https://github.com/lycheeverse/lychee/pull/620), [#1129](https://github.com/lycheeverse/lychee/issues/1129), and the [example config file](https://github.com/lycheeverse/lychee/blob/4d31fb777dc6ddb0f870336c0875c218c5014624/lychee.example.toml).

