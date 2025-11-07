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
						{ label: "Getting Started", link: "/guides/getting-started" },
						{ label: "Library Usage", link: "/guides/library" },
						{ label: "Configure lychee", link: "/guides/config" },
						{ label: "CLI", link: "/guides/cli" },
						{ label: "Output Modes", link: "/guides/output" },
					],
				},
				{
					label: "Recipes",
					items: [
						{ label: "Anchor Links", link: "/recipes/anchors" },
						{ label: "Caching", link: "/recipes/caching" },
						{ label: "Excluding Links", link: "/recipes/excluding-links" },
						{ label: "Excluding Paths", link: "/recipes/excluding-paths" },
						{
							label: "Remapping One URL to Another",
							link: "/recipes/migration",
						},
						{
							label: "Testing Sites Not Served from Root with --base-url",
							link: "/recipes/base-url",
						},
						{
							label: "Local File Checking with --root-dir",
							link: "/recipes/root-dir",
						},
						{
							label: "Pretty URLs (Fallback Extensions and Index Files)",
							link: "/recipes/pretty-urls",
						},
						{ label: "Wikilinks", link: "/recipes/wikilinks" },
					],
				},
				{
					label: "GitHub Action Recipes",
					items: [
						{
							label: "Check Links in Repository",
							link: "/github_action_recipes/check-repository",
						},
						{
							label: "Check Links in Pull Requests",
							link: "/github_action_recipes/pull-requests",
						},
						{
							label: "Replace with Archived Links",
							link: "/github_action_recipes/archived-links",
						},
						{
							label: "Add Pull Request Comment",
							link: "/github_action_recipes/add-pr-comment",
						},
						{
							label: "Caching Requests",
							link: "/github_action_recipes/caching",
						},
					],
				},
				{
					label: "Troubleshooting",
					items: [
						{ label: "Rate Limits", link: "/troubleshooting/rate-limits" },
						{
							label: "Custom Headers",
							link: "/troubleshooting/custom-headers",
						},
						{ label: "Mail Addresses", link: "/troubleshooting/mail" },
						{
							label: "Network Errors",
							link: "/troubleshooting/network-errors",
						},
						{
							label: "Too Many Open Files",
							link: "/troubleshooting/open-files",
						},
						{
							label: "Too Many Redirects",
							link: "/troubleshooting/redirects",
						},
						{
							label: "Special Status Codes",
							link: "/troubleshooting/status-codes",
						},
					],
				},
				{
					label: "Internals",
					items: [
						{
							label: "How lychee Works",
							link: "/internals/how-it-works",
						},
						{
							label: "Contributing",
							link: "/internals/contributing",
						},
						{
							label: "Sponsors",
							link: "/internals/sponsors",
						},
						{
							label: "Credits",
							link: "/internals/credits",
						},
						{
							label: "Users",
							link: "/internals/users",
						},
					],
				},
			],
		}),
	],
});
