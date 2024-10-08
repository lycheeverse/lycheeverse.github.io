---
title: Checking Anchor Links (Fragment Identifiers)
---

lychee can check anchor links (also called fragments) in both HTML and Markdown files. This feature helps ensure that internal links to specific sections of a page are valid.

## Quick Start

To enable anchor link checking, use the `--include-fragments` flag:

```bash
lychee --include-fragments 'https://example.com/docs'
```

## Supported Formats Overview

| Feature                    | Markdown | HTML | Inline HTML in Markdown |
|----------------------------|----------|------|-------------------------|
| Heading-based fragments    | ✅        | ✅    | ✅                       |
| Custom ID fragments        | ✅        | ✅    | ✅                       |
| Unicode in fragments       | ✅        | ✅    | ✅                       |
| Inline code in headings    | ✅        | N/A  | N/A                     |

## Detailed Information

### Supported Formats 

- Markdown (.md) files
- HTML (.html) files
- Inline HTML within Markdown files

### Supported Anchor Link Types

- Links to headings (e.g., `#introduction`)
- Links to custom IDs (e.g., `#custom-section-id`)
- Unicode characters in fragments (e.g., `#résumé`)

### How does lychee generate fragments for comparison?

lychee uses two main methods:
1. Heading Attributes: For explicit IDs specified in Markdown (e.g., `## My Heading {#custom-id}`)
2. Unique Kebab Case: For standard headings, similar to GitHub's auto-generated anchors

### Supported Edge Cases

lychee handles:

- Headings with inline code (e.g., ``# `code` in heading``)
- Unicode characters in headings
- Underscores in headings (preserved in fragments)

## Limitations

- Complex or nested HTML structures might not be fully supported
- JavaScript-generated anchors cannot be checked
- Some advanced Markdown or HTML processor-specific features may not be recognized.
  Create an issue if you encounter any problems.

## Troubleshooting

In case of issues with anchor link checking, here are some tips:

- Use explicit IDs for complex headings or when targeting specific elements
- Ensure your Markdown and HTML follow standard practices for heading structures
- For HTML files, use the `id` attribute on elements you want to link to
