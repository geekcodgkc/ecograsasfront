import React from "react";
import "../../styles/global.scss";
import NavBar from "../../components/nav";
import Footer from "../../components/footer";
import Helmet from "react-helmet";

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<>
			<Helmet
				htmlAttributes={{
					lang: "es",
				}}
			/>
			<NavBar />
			<main className="w-full bg-slate-100 min-h-screen flex flex-wrap">
				{children}
			</main>
			<Footer />
		</>
	);
}
