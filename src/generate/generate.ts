import assert from "node:assert";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { LYCHEE_VERSION } from "./lychee-version";
import { generateCliOptionsMarkdown } from "./generate-cli-options";

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
		placeholder: string,
		replacement: string,
	) {
		const [dir, file] = [dirname(templatePath), basename(templatePath)];
		const outputPath = join(dir, file.replace("_", ""));

		this.logger.info(`Using template file ${templatePath}`);

		this.addWatchFile(realpathSync(templatePath));
		this.addWatchFile(import.meta.filename);

		rmSync(outputPath, { force: true });

		const docTemplateText = readFileSync(templatePath, "utf-8");
		const docOutput = docTemplateText.replace(placeholder, replacement);

		assert(
			docOutput !== docTemplateText,
			`Placeholder ${placeholder} not found in template file ${templatePath}`,
		);

		this.logger.info(`Writing output file ${outputPath}`);
		writeFileSync(outputPath, docOutput);
	}

	// Generate cli.md file from README.md
	async cliOptions() {
		const content = await generateCliOptionsMarkdown(
			await this.fetchFromRepository("README.md"),
		);

		await this.applyPlaceholder(
			"src/content/docs/guides/_cli.md",
			"README-OPTIONS-PLACEHOLDER",
			content,
		);
	}
}

export function generateContent(): AstroIntegration {
	return {
		name: "lycheeverse:generate-content",
		hooks: {
			"astro:config:setup": async ({ logger, addWatchFile }) => {
				const generator = new Generator(logger, addWatchFile);
				await generator.cliOptions();
			},
		},
	};
}
