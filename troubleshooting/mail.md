## Unreachable Mail Address

We use https://github.com/reacherhq/check-if-email-exists for email checking.
You can test your mail address with curl:

```bash
 curl -X POST \
  'https://api.reacher.email/v0/check_email' \
  -H 'content-type: application/json' \
  -H 'authorization: test_api_token' \
  -d '{"to_email": "box@domain.test"}'
```

Some settings on your mail server (such as SPF Policy, DNSBL) may prevent your email from being verified.
If you have an error with checking a working email, you can disable this check using the
[commandline parameter](https://github.com/lycheeverse/lychee#commandline-parameters) `--exclude-mail`.
