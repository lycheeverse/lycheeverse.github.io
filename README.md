# lychee Documentation

Official documentation for [lychee](https://github.com/lycheeverse/lychee), a fast link checker for finding broken URLs and email addresses in Markdown, HTML, and documentation files.

**📖 [View Documentation](https://lychee.cli.rs)**

[![Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-links.yml)
[![Code Quality](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-code-quality.yml)
[![PR Links](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/check-pr-links.yml)
[![Deploy](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lycheeverse/lycheeverse.github.io/actions/workflows/deploy.yml)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## Development

### Prerequisites

- Node.js 18 or higher
- npm or pnpm

### Local Setup

```bash
# Clone the repository
git clone https://github.com/lycheeverse/lycheeverse.github.io.git
cd lycheeverse.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

Contributions are welcome! Here's how you can help:

### Report Issues

[Check existing issues](https://github.com/lycheeverse/lycheeverse.github.io/issues) or [create a new one](https://github.com/lycheeverse/lycheeverse.github.io/issues/new/choose) for:
- Typos or errors
- Broken links
- Missing documentation
- Confusing explanations

### Submit Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b improve-docs`)
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

All documentation files are located in `src/content/docs/`.

### Edit on GitHub

Each documentation page has an "Edit this page" link that takes you directly to the source file on GitHub.
