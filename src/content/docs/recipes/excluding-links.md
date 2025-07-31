---
title: Excluding Links
---

lychee allows you to selectively check links using `--include` and `--exclude` parameters. Both accept regular expressions, giving you powerful control over which links to check or ignore.

## Basic Usage

Here are some basic examples to get you started:

```bash
# Exclude all links that contain "example.com" and "example.org"
lychee --exclude example\.com --exclude example\.org

# Same as above, but using a single exclude parameter
lychee --exclude example\.(com|org)

# Check only links that contain "twitter.com"
lychee --exclude '.*' --include 'twitter\.com'
```

:::tip

A common use-case is to exclude all "local" links, i.e. localhost, 127.0.0.1,
private IP addresses, etc.:

```bash
# Exclude all local links
lychee --exclude-all-private
```

:::

## Advanced Examples

Let's look at some more advanced, real-world scenarios:

```bash
# Exclude links to specific file types
lychee --exclude '\.(pdf|zip|png|jpg)$'

# Exclude links to social media platforms
lychee --exclude '(facebook|twitter|linkedin|instagram)\.com'

# Check only links within your own domain
lychee --include '^https?://yourdomain\.com'

# Exclude links to specific subdomains
lychee --exclude '^https?://blog\.example\.com'

# Exclude links with certain URL parameters
lychee --exclude '\?utm_source='

# Exclude links to specific sections of a website
lychee --exclude 'example\.com/blog/\d{4}/'
```

## Important Notes

1. **Full URL Matching**: The regex matches against the full URL, including the scheme (http:// or https://). For example:

   ```bash
   # This will work:
   lychee --exclude '^https://www\.linkedin\.com'

   # This might not work as expected:
   lychee --exclude 'linkedin\.com'
   ```

2. **Precedence**: Includes take precedence over excludes. You can use this to create complex filtering rules.

3. **Escaping Special Characters**: Remember to escape special regex characters like `.` with a backslash.

4. **Testing Your Regex**: It's a good idea to test your regex patterns before using them with lychee. You can use [online regex testers](https://regex101.com/), `grep`, or [`ripgrep`](https://github.com/BurntSushi/ripgrep) for this purpose.

## Permanently Excluding Links

If you have links you **always** want to exclude, you can put them into a
`.lycheeignore` file in the root of your project:

```plaintext title=".lycheeignore"
https://www.zombo.com/
# This is a comment, which will be ignored
https://www.youtube.com/watch?v=dQw4w9WgXcQ
# Regex is also supported in here
https?:\/\/(www\.)?reddit\.com\/r\/(funny|videos)
^mailto:  # Ignore all mailto links
```

This way, you don't have to specify them with `--exclude` every time you run lychee
and you can check them into version control.

## Tips for Effective Link Exclusion

1. **Start Specific**: Begin with specific exclusions and broaden them if needed.
2. **Use Comments**: In `.lycheeignore`, use comments to explain complex patterns.
3. **Group Similar Exclusions**: Use regex alternation `(a|b)` to group similar exclusions.
4. **Review Regularly**: Periodically review your exclusions to ensure they're still relevant.
5. **Combine with Other Flags**: Use exclusions in combination with other lychee flags like `--include` for fine-grained control.

## Troubleshooting

If your exclusions aren't working as expected:

- Make sure you use **single quotes** (`'`) around your regex patterns to prevent shell expansion.
  Depending on your shell, double quotes (`"`) might not work as expected
  and single quotes are the only way to ensure the regex is passed to lychee correctly.
- Check that your regex is correct and escapes special characters properly.
- Use an online regex tester to validate your patterns.
- Ensure you're matching against the **full URL**, including the scheme.
  So if you want to exclude `example.com`, use `^https?://example\.com`.
- Use lychee's verbose output (`-v`) to see which links are being checked or excluded.
- For complex setups, consider breaking your check into multiple lychee runs with different exclusion/inclusion rules.

Remember, the goal is to strike a balance between thorough link checking and avoiding false positives or unnecessary checks. Tailor your exclusions to your specific needs and the structure of your content.
