import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

import { readFileSync, writeFileSync } from "node:fs";

const readme = fetch("https://raw.githubusercontent.com/lycheeverse/lychee/refs/heads/master/LICENSE-MIT")

const docTemplate = readFileSync("src/content/docs/usage/_cli.md", "utf-8");

const usageText = addHeadings(await (await readme).text());

const x = docTemplate.replace('OPTIONSGOHERE', usageText);

writeFileSync("src/content/docs/usage/cli.md", x);

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};





function addHeadings(arg0: string): string {
    throw new Error("Function not implemented.");
}
