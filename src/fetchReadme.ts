import assert from "node:assert";
import { readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { AstroIntegration } from "astro";

const VERSION = "lychee-v0.21.0";

// https://raw.githubusercontent.com/lycheeverse/lychee/master/README.md
const url = `https://raw.githubusercontent.com/lycheeverse/lychee/refs/tags/${VERSION}/README.md`;

const TEMPLATE = "README-OPTIONS-PLACEHOLDER";

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

export async function generateCliOptionsMarkdown() {
	const readme = await fetch(url);
	assert(readme.ok, `${readme.status} when fetching ${url}`);

	const rawUsageText = extractHelpFromReadme(await readme.text());
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

export function generateCliOptionsIntegration(
	templatePath: string,
): AstroIntegration {
	const [dir, file] = [dirname(templatePath), basename(templatePath)];

	const outputPath = join(dir, file.replace("_", ""));

	return {
		name: "lycheeverse:generate-cli-page",
		hooks: {
			"astro:config:setup": async ({ logger, addWatchFile }) => {
				logger.info(`Using template file ${templatePath}`);

				addWatchFile(realpathSync(templatePath));
				addWatchFile(import.meta.filename);

				logger.info(`Fetching from git tag ${VERSION}`);
				rmSync(outputPath, { force: true });
				const usageText = generateCliOptionsMarkdown();

				const docTemplateText = readFileSync(templatePath, "utf-8");
				const docOutput = docTemplateText.replace(TEMPLATE, await usageText);

				assert(
					docOutput !== docTemplateText,
					`Placeholder ${TEMPLATE} not found in template file`,
				);
				logger.info(`Writing output file ${outputPath}`);
				writeFileSync(outputPath, docOutput);
			},
		},
	};
}
