import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import smartypants from "remark-smartypants";
import { generateContent } from "./src/generate/generate";

// https://astro.build/config
export default defineConfig({
	site: "https://lychee.cli.rs",
	markdown: {
		remarkPlugins: [
			// automatically converting smart dashes causes problems with cli arguments.
			// to insert dashes, use unicode or &mdash; or &ndash;.
			[smartypants, { dashes: false }],
		],
	},
	integrations: [
		generateContent(),
		starlight({
			expressiveCode: {
				themes: ["catppuccin-frappe", "catppuccin-latte"],
			},
			title: "Docs",
			description:
				"Official documentation for lychee - a fast, asynchronous link checker",
			editLink: {
				baseUrl:
					"https://github.com/lycheeverse/lycheeverse.github.io/edit/master/",
			},
			logo: {
				alt: "lychee Logo",
				replacesTitle: true,
				src: "./src/assets/logo.svg",
			},
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/lycheeverse/lychee/",
				},
			],
			customCss: ["./src/styles/index.css", "./src/fonts/font-face.css"],
			sidebar: [
				{
					label: "Overview",
					link: "/overview",
				},
				{
					label: "Guides",
					items: [
						"guides/getting-started",
						"guides/cli",
						"guides/config",
						"guides/output",
						"guides/preprocessing",
						"guides/library",
					],
				},
				{
					label: "Recipes",
					items: [
						"recipes/anchors",
						"recipes/caching",
						"recipes/excluding-links",
						"recipes/excluding-paths",
						"recipes/migration",
						"recipes/base-url",
						"recipes/root-dir",
						"recipes/pretty-urls",
						"recipes/wikilinks",
					],
				},
				{
					label: "GitHub Action Recipes",
					items: [
						"github_action_recipes/check-repository",
						"github_action_recipes/pull-requests",
						"github_action_recipes/archived-links",
						"github_action_recipes/add-pr-comment",
						"github_action_recipes/caching",
					],
				},
				{
					label: "Troubleshooting",
					items: [
						"troubleshooting/rate-limits",
						"troubleshooting/custom-headers",
						"troubleshooting/mail",
						"troubleshooting/network-errors",
						"troubleshooting/open-files",
						"troubleshooting/redirects",
						"troubleshooting/status-codes",
					],
				},
				{
					label: "Internals",
					items: [
						"internals/how-it-works",
						"internals/contributing",
						"internals/sponsors",
						"internals/credits",
						"internals/users",
					],
				},
			],
		}),
	],
});
