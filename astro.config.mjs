import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://lychee.cli.rs",
  integrations: [
    starlight({
      title: "Docs",
      editLink: {
        baseUrl:
          "https://github.com/lycheeverse/lycheeverse.github.io/edit/master/",
      },
      logo: {
        src: "./public/logo.svg",
      },
      social: {
        github: "https://github.com/lycheeverse/lychee/",
      },
      customCss: ["./src/styles/index.css"],
      sidebar: [
        {
          label: "Start Here",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Introduction", link: "/introduction" },
            { label: "Installation", link: "/installation/" },
            { label: "GitHub Action", link: "/guides/github-action" },
            { label: "Docker", link: "/guides/docker" },
            { label: "Library Usage", link: "/usage/library" },
            { label: "Comparison", link: "/comparison/" },
          ],
        },
        {
          label: "Configuration",
          items: [
            { label: "Command Line Options", link: "/usage/cli" },
            { label: "Configuration File", link: "/usage/config" },
          ],
        },
        {
          label: "Recipes",
          items: [
            { label: "Filtering Links", link: "/recipes/filtering-links" },
            { label: "Excluding Paths", link: "/recipes/excluding-paths" },
            { label: "Relative Links", link: "/recipes/relative-links" },
            { label: "Migrating Websites", link: "/recipes/migration" },
          ],
        },
        {
          label: "GitHub Action Recipes",
          items: [
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
          label: "Trouble Shooting Guide",
          items: [
            { label: "Rate Limits", link: "/troubleshooting/rate-limits" },
            {
              label: "Custom Headers",
              link: "/troubleshooting/custom-headers",
            },
            { label: "Mail Addresses", link: "/troubleshooting/mail" },
            {
              label: "Too Many Open Files",
              link: "/troubleshooting/open-files",
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
