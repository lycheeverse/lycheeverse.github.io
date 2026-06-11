# lychee docs

This is the source for the official documentation of [lychee](https://github.com/lycheeverse/lychee/), a fast, async link checker.

[![Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml)
[![Code Quality](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml)
[![PR Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml)
[![Deploy](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## Development

Requires [Node.js](https://nodejs.org/) (v18+) and [pnpm](https://pnpm.io/).

```bash
git clone https://github.com/lycheeverse/lycheeverse.github.io.git
cd lycheeverse.github.io
pnpm install
pnpm dev
```

Here are some helpful commands:

- `pnpm build`: production build
- `pnpm preview`: serve the build
- `pnpm lint` and `pnpm format`: check and fix formatting and linting
- `make watch` or `pnpm dev`: watch for changes and rebuild

## Contributing

Documentation lives in `src/content/` as Markdown/MDX. To contribute, fork the repo, make your changes on a branch, and open a pull request. For problems, [open an issue](https://github.com/lycheeverse/lycheeverse.github.io/issues/new/choose).

Before opening a pull request, run `pnpm precommit` to check formatting and linting.
