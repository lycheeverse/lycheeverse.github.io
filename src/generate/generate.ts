import assert from "node:assert";
import { readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { generate as generateCliOptionsMarkdown } from "./generate-cli-options";
import { LYCHEE_VERSION } from "./lychee-version";

class Generator {
	constructor(
		private logger: AstroIntegrationLogger,
		private addWatchFile: (path: URL | string) => void,
	) {}

	// Fetch file from main lychee repository at the currently pinned tag
	private async fetchFromRepository(filePath: string) {
		this.logger.info(`Fetching ${filePath} from git tag ${LYCHEE_VERSION}`);
		const url = `https://raw.githubusercontent.com/lycheeverse/lychee/refs/tags/${LYCHEE_VERSION}/${filePath}`;

		const readme = await fetch(url);
		assert(readme.ok, `${readme.status} when fetching ${url}`);
		return readme.text();
	}

	// Rewrite the template file at templatePath to a non-template file
	// and replace the placeholder in the process.
	private async applyPlaceholder(
		templatePath: string,
		replacements: Array<{ placeholder: string; value: string }>,
	) {
		const [dir, file] = [dirname(templatePath), basename(templatePath)];
		const outputPath = join(dir, file.replace("_", ""));

		this.logger.info(`Using template file ${templatePath}`);

		this.addWatchFile(realpathSync(templatePath));
		this.addWatchFile(import.meta.filename);

		rmSync(outputPath, { force: true });
		let content = readFileSync(templatePath, "utf-8");

		for (const { placeholder, value } of replacements) {
			const before = content;
			content = content.replace(placeholder, () => value);
			const after = content;

			if (before === after) {
				throw new Error(
					`Placeholder ${placeholder} not found in template file ${templatePath}`,
				);
			}
		}

		this.logger.info(`Writing output file ${outputPath}`);
		writeFileSync(outputPath, content);
	}

	// Generate cli.md file from README.md
	async cliOptions() {
		const content = await generateCliOptionsMarkdown(
			await this.fetchFromRepository("README.md"),
		);
		await this.applyPlaceholder("src/content/docs/guides/_cli.md", [
			{ placeholder: "README-OPTIONS-PLACEHOLDER", value: content },
		]);
	}

	// Generate config.md file from lychee.example.toml
	async config() {
		const content = await this.fetchFromRepository("lychee.example.toml");
		await this.applyPlaceholder("src/content/docs/guides/_config.md", [
			{
				placeholder: "CONFIG-PLACEHOLDER",
				value: content,
			},
			{
				placeholder: "CONFIG-VERSION-NOTE-PLACEHOLDER",
				value: versionNote("This config file is up-to date as of"),
			},
		]);
	}
}

// Create a note explaining which lychee version is pinned for generation.
export function versionNote(message = "This page is up-to-date as of") {
	return `
  :::note
  ${message}
  [${LYCHEE_VERSION}](https://github.com/lycheeverse/lychee/releases/tag/${LYCHEE_VERSION}).
  :::
  `;
}

// Produce all generated files.
export function generateFiles(): AstroIntegration {
	return {
		name: "lycheeverse:generate-content",
		hooks: {
			"astro:config:setup": async ({ logger, addWatchFile }) => {
				const generator = new Generator(logger, addWatchFile);
				await generator.cliOptions();
				await generator.config();
			},
		},
	};
}
