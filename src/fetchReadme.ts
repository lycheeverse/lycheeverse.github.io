import assert from 'node:assert';

const VERSION = "lychee-v0.21.0";

// https://raw.githubusercontent.com/lycheeverse/lychee/master/README.md
const url = `https://raw.githubusercontent.com/lycheeverse/lychee/refs/tags/${VERSION}/README.md`;


function extractHelpFromReadme(readme: string) {
  const [, section] = readme.split(/### Commandline Parameters/, 2);
  if (!section)
    throw new Error(
      "LycheeCliOptions: commandline parameters section not found in readme",
    );

  const [, text] = section.split("\n```help-message\n", 2);
  if (!text)
    throw new Error(
      "LycheeCliOptions: ```help-message marker not found in commandline parameters section",
    );

  const [helpText] = text.split("\n```\n", 2);
  if (!helpText)
    throw new Error(
      "LycheeCliOptions: closing ``` marker not found after ```text",
    );

  return helpText;
}

// https://stackoverflow.com/a/6234804
function escapeMarkdown(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function splitLines(s: string): string[] {
  return s.split(/\r?\n/g);
}

function* generateMarkdown(lines: string[]) {
  const headingRegex = /^\w+:$/;
  const optionRegex = /^[- ,a-zA-Z]{2,6}(--|\[)([a-z-.\]]+)/;
  const usageRegex = /^Usage: /;
  const bodyRegex = /^          (.*)/;

  let match;
  for (const line of lines) {
    if (line.match(usageRegex)) {
      yield '```';
      yield line;
      yield '```';

    } else if (line.match(headingRegex)) {
      yield "## " + escapeMarkdown(line.replace(/:$/, ''));

    } else if (match = line.match(optionRegex)) {
      // TODO: zero width space.........
      const option = escapeMarkdown(match[0]).replace(/-/g, '-&ZeroWidthSpace;');
      yield `### ${option.trim()}`;
      yield '';
      yield '```';
      yield line.trimStart();
      yield '```';

    } else if (match = line.match(bodyRegex)) {
      yield '    ' + match[1];

    } else {
      yield line;
    }
  }
}

export async function generateCliOptionsMarkdown() {
  const readme = await fetch(url);
  assert(readme.ok, `${readme.status} when fetching ${url}`);

  const rawUsageText = extractHelpFromReadme(await readme.text());
  const usageText = [...generateMarkdown(splitLines(rawUsageText))].join("\n");

  assert(usageText.search('\n## Options\n'), 'options heading missing');
  assert(usageText.search('\n### --dump\n'), '--dump heading missing');
  assert(usageText.search('\n### --root-dir\n'), '--rot-dir heading missing');

  return usageText;
}

