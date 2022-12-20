# Checking Relative Links

Say you have an index.html with a relative link to another page:

```html
<a href="/about/pages">About</a>
<a href="/company">Company</a>
```

How do you know that they work? 🤔
With lychee you can check that!

Here's how to check all the links in your index.html:

```bash
lychee --base https://example.com/ index.html
```

The `--base` option takes a URL.
All relative links are resolved against this URL.

So all relative links in `index.html` will be prefixed with
`https://example.com/`:

```html
<a href="https://example.com/about/pages">About</a>
<a href="https://example.com/company">Company</a>
```

You can also check the links on a local `dev` version of your website:

```bash
lychee --base http://localhost:8000/ ...
```

`--base` also works with a file path:

```bash
lychee --base file:///home/user/website/ ...
```

For more information about the `--base` option, see `lychee --help`
or the [options page](/usage/cli).
