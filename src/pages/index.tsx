import * as React from "react";
import type { PageProps, HeadFC } from "gatsby";
import Home from "../containers/home";
import { Helmet } from "react-helmet";

const IndexPage: React.FC<PageProps> = () => {
	return <Home />;
};

export default IndexPage;

export const Head: HeadFC = () => (
	<>
		<title>EcoGrasas</title>
		<meta
			name="description"
			content="ecograsas procesadores de aceite de palma para reposteria y elaboracion de jabon, ubicada en tinaquillo cojedes"
		/>
		<Helmet>
			<title>{"EcoGrasas"}</title>
			<link
				rel="preload"
				as="image"
				href="https://ecograsas.com/_gatsby/image/241dc69371444e0821787462141a018d/4ff04feac21007eda41b57b8106fddca/hojas-palma-tropical.webp?u=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fndin4myo%2Fproduction%2F1dc3a38a5dc40d84b6b512ea396a382ab951d5ac-5472x3648.jpg&a=w%3D1280%26h%3D719%26fm%3Dwebp%26q%3D80&cd=1532d03001ccb9baa6ab60509aaacf89"
			/>
		</Helmet>
	</>
);
