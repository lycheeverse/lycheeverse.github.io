import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { generateCliOptionsMarkdown } from "./fetchReadme";
import { writeFileSync, readFileSync, rmSync } from "node:fs";

const docTemplateFile = "src/content/docs/guides/_cli.md";
const docOutputFile = docTemplateFile.replace('_', '');

rmSync(docOutputFile, { force: true });
const usageText = await generateCliOptionsMarkdown();

const docTemplateText = readFileSync(docTemplateFile, "utf-8");
const docOutput = docTemplateText.replace('README-OPTIONS-PLACEHOLDER', usageText);
writeFileSync(docOutputFile, docOutput);


export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
