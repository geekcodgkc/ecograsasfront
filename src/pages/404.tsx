import * as React from "react";
import { Link, HeadFC, PageProps } from "gatsby";

const pageStyles = {
	color: "#232129",
	padding: "96px",
	fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
	marginTop: 0,
	marginBottom: 64,
	maxWidth: 320,
};

const paragraphStyles = {
	marginBottom: 48,
};
const codeStyles = {
	color: "#8A6534",
	padding: 4,
	backgroundColor: "#FFF4DB",
	fontSize: "1.25rem",
	borderRadius: 4,
};

const NotFoundPage: React.FC<PageProps> = () => {
	return (
		<main style={pageStyles}>
			<h1 style={headingStyles}>Page not found</h1>
			<p style={paragraphStyles}>
				Que mal... 😔, no pudimos encotrar la pagina que buscabas.
				<br />
				{process.env.NODE_ENV === "development" ? (
					<>
						<br />
						Try creating a page in <code style={codeStyles}>src/pages/</code>.
						<br />
					</>
				) : null}
				<br />
				<Link to="/">Regrasar al inicio</Link>.
			</p>
		</main>
	);
};

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
