# lychee Documentation

This is the source code for the official documentation of [lychee](https://github.com/lycheeverse/lychee/), a fast, async link checker.

[![Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml)
[![Code Quality](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml)
[![PR Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml)
[![Deploy](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) package manager

### Development

```bash
# Clone the repository
git clone https://github.com/lycheeverse/lycheeverse.github.io.git
```

```bash
# Install dependencies
pnpm install
```

```bash
# Start local dev server
pnpm dev
```

## Contributing

We welcome contributions! Here's how to help:

### Report Issues

Found a problem? Check if it's already been reported in our [issues](https://github.com/lycheeverse/lycheeverse.github.io/issues). If not, [create a new issue](https://github.com/lycheeverse/lycheeverse.github.io/issues/new/choose).

### Submit Changes

1. Fork the repository
2. Create a feature branch
3. Make your changes (fix typos, broken links, etc.)
4. Submit a pull request

## Project Structure

```
├── src/
│   ├── assets/          # Images and static files
│   └── content/         # Documentation pages (Markdown/MDX)
├── astro.config.mjs     # Astro configuration
└── package.json
```
