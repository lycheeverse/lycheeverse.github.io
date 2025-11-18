import assert from "node:assert";
import {
	readFileSync,
	realpathSync,
	rmSync,
	watchFile,
	writeFileSync,
} from "node:fs";
import { basename, dirname, join } from "node:path";
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

export async function generateCliOptionsMarkdown(readmeContents: string) {
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

// Fetch file from main lychee repository at the currently pinned tag
async function fetchFromRepository(filePath: string) {
	const url = `https://raw.githubusercontent.com/lycheeverse/lychee/refs/tags/${LYCHEE_VERSION}/${filePath}`;

	const readme = await fetch(url);
	assert(readme.ok, `${readme.status} when fetching ${url}`);
	return readme.text();
}

// Rewrite the template file at templatePath to a non-template file
// and replace the placeholder in the process.
async function applyPlaceholder(
	templatePath: string,
	placeholder: string,
	replacement: string,
	logger: AstroIntegrationLogger,
	addWatchFile: (path: URL | string) => void,
) {
	const [dir, file] = [dirname(templatePath), basename(templatePath)];
	const outputPath = join(dir, file.replace("_", ""));

	logger.info(`Using template file ${templatePath}`);

	addWatchFile(realpathSync(templatePath));
	addWatchFile(import.meta.filename);

	rmSync(outputPath, { force: true });

	const docTemplateText = readFileSync(templatePath, "utf-8");
	const docOutput = docTemplateText.replace(placeholder, replacement);

	assert(
		docOutput !== docTemplateText,
		`Placeholder ${placeholder} not found in template file ${templatePath}`,
	);
	logger.info(`Writing output file ${outputPath}`);
	writeFileSync(outputPath, docOutput);
}

async function generateCliFile(
	logger: AstroIntegrationLogger,
	addWatchFile: (path: URL | string) => void,
) {
	logger.info(`Fetching from git tag ${LYCHEE_VERSION}`);
	const content = await generateCliOptionsMarkdown(
		await fetchFromRepository("README.md"),
	);

	await applyPlaceholder(
		"src/content/docs/guides/_cli.md",
		"README-OPTIONS-PLACEHOLDER",
		content,
		logger,
		addWatchFile,
	);
}

export function generateContent(): AstroIntegration {
	return {
		name: "lycheeverse:generate-content",
		hooks: {
			"astro:config:setup": async ({ logger, addWatchFile }) => {
				generateCliFile(logger, addWatchFile);
			},
		},
	};
}
