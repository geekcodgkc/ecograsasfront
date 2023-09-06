import type { GatsbyConfig } from "gatsby";
import "dotenv/config";

const config: GatsbyConfig = {
	siteMetadata: {
		title: "ecograsas",
		siteUrl: "https://www.ecograsas.com",
		lang: "es",
		description:
			"ecograsas procesadores de aceite de palma para reposteria y elaboracion de jabon",
	},
	// More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
	// If you use VSCode you can also use the GraphQL plugin
	// Learn more at: https://gatsby.dev/graphql-typegen
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-webpack-bundle-analyser-v2",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-netlify",
			options: {
				generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
			},
		},
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: "https://www.ecograsas.com",
			},
		},
		{
			resolve: "gatsby-source-sanity",
			options: {
				projectId: process.env.SANITY_PROJECT_ID,
				dataset: process.env.SANITY_DATASET,
				token: process.env.SANITY_TOKEN,
			},
		},
		"gatsby-plugin-image",
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-robots-txt",
			options: {
				host: "https://www.ecograsas.com",
				sitemap: "https://www.ecograsas.com/sitemap.xml",
				policy: [{ userAgent: "*", allow: "/" }],
			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/icon.jpeg",
			},
		},
		"gatsby-plugin-mdx",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: "./src/images/",
			},
			__key: "images",
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "pages",
				path: "./src/pages/",
			},
			__key: "pages",
		},
		{
			resolve: "gatsby-plugin-sass",
			options: {
				// Configure SASS to process Tailwind
				postCssPlugins: [require("tailwindcss")],
			},
		},
	],
};

export default config;
