import assert from "node:assert";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { LYCHEE_VERSION } from "./lychee-version";

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
			"LycheeCliOptions: closing ``` marker not found after ```help-message",
		);

	return helpText.trim();
}

function splitLines(s: string): string[] {
	return s.split(/\r?\n/g);
}

// biome-ignore-start lint/suspicious/noAssignInExpressions: using assignment expressions for regex match is conventional
function* generateMarkdown(lines: string[]) {
	const headingRegex = /^(\w+):$/;
	const optionRegex = /^[- ,a-zA-Z]{2,6}(--|\[)([a-z-.\]]+)/;
	const usageRegex = /^Usage: /;
	const bodyRegex = /^ {10}(.*)/;
	const defaultValuesRegex = /^\[(default|possible values|env): (.*)\]$/;

	let match: RegExpMatchArray | null = null;
	for (const line of lines) {
		if (line.match(usageRegex)) {
			yield "Usage:";
			yield "```bash";
			yield line.replace(/^Usage: /, "");
			yield "```";
			yield `
:::note
This page is up-to-date as of
[${LYCHEE_VERSION}](https://github.com/lycheeverse/lychee/releases/tag/${LYCHEE_VERSION}).
:::
`;
		} else if ((match = line.match(headingRegex))) {
			yield `## ${match[1]}`;
		} else if ((match = line.match(optionRegex))) {
			const option = match[0].trim();
			const longOption = line.replace(/-[^-],/, "");
			yield `### ${option}`;
			yield "";
			yield "```bash";
			yield `lychee ${longOption.trimStart()}`;
			yield "```";
			yield "";
		} else if ((match = line.match(bodyRegex))) {
			const line = match[1];
			if ((match = line.match(defaultValuesRegex))) {
				yield `**${match[1]}**: ${match[2]}`;
				yield "";
			} else {
				yield line;
			}
		} else {
			yield line;
		}
	}
}
// biome-ignore-end lint/suspicious/noAssignInExpressions: using assignment expressions for regex match is conventional

export async function generate(readmeContents: string) {
	const rawUsageText = extractHelpFromReadme(readmeContents);
	const usageText = [...generateMarkdown(splitLines(rawUsageText))].join("\n");

	assert(
		usageText.match("\n## Options\n"),
		"options heading missing, check headingRegex",
	);
	assert(
		usageText.match("\n### --dump\n"),
		"--dump heading missing, check optionRegex",
	);
	assert(
		usageText.match("\n### --root-dir\n"),
		"--root-dir heading missing, check optionRegex",
	);
	assert(
		usageText.match("\nInputs for link checking"),
		"expected body text missing, check bodyRegex",
	);

	return usageText;
}
