import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://lychee.cli.rs",
	integrations: [
		starlight({
			expressiveCode: {
				themes: ["catppuccin-frappe", "catppuccin-latte"],
			},
			title: "Docs",
			description:
				"Official documentation for lychee, a fast link checker for finding broken URLs and email addresses in Markdown, HTML, and documentation files",
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
				{ slug: "overview" },
				{
					label: "Guides",
					items: [
						"guides/getting-started",
						"guides/library",
						"guides/config",
						"guides/cli",
						"guides/output",
						"guides/github-actions",
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
