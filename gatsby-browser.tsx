import React from "react";
import Layout from "./src/containers/layout";
import type { GatsbyBrowser } from "gatsby";
import "./src/styles/global.scss";

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({
	element,
}) => {
	return <Layout>{element}</Layout>;
};
