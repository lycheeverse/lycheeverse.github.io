import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://lychee.cli.rs",
  integrations: [
    starlight({
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
        src: "./public/logo.svg",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/lycheeverse/lychee/",
        },
      ],
      customCss: ["./src/styles/index.css"],
      sidebar: [
        {
          label: "Start Here",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", link: "/introduction" },
            { label: "Installation", link: "/installation" },
            { label: "GitHub Action", link: "/github-action" },
            { label: "Docker", link: "/docker" },
            { label: "Library Usage", link: "/library" },
            { label: "Comparison", link: "/comparison" },
          ],
        },
        {
          label: "Configuration",
          items: [
            { label: "Command Line Options", link: "/usage/cli" },
            { label: "Configuration File", link: "/usage/config" },
            { label: "Output Modes", link: "/usage/output" },
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
            { label: "Pretty URLs", link: "/recipes/pretty-urls" },
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
              label: "Reuse GitHub Issue",
              link: "/github_action_recipes/reuse-issue",
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
          label: "Troubleshooting Guide",
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
          label: "Lychee Development",
          items: [
            {
              label: "How Lychee Works",
              link: "/how-it-works",
            },
            {
              label: "Contributing",
              link: "/contributing",
            },
          ],
        },
        {
          label: "About Us",
          items: [
            {
              label: "Sponsors",
              link: "/sponsors",
            },
            {
              label: "Credits",
              link: "/credits",
            },
            {
              label: "Community",
              link: "/community",
            },
            {
              label: "Users",
              link: "/users",
            },
            {
              label: "History",
              link: "/history",
            },
          ],
        },
      ],
    }),
  ],
});
