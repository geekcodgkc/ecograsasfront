import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import "./index.scss";
import { useUserStore } from "../../store";

export default function Hero() {
	const isBrowser = () => typeof window !== "undefined";
	const useStore = useUserStore((state) => state);
	const { allSanityHero } = useStaticQuery(query);
	const heroData = allSanityHero.nodes[0];

	return (
		<header
			className="hero flex flex-col justify-end p-20 pb-36 gap-4"
			style={{
				backgroundImage: `url(${heroData.mainImage.asset.resize.src})`,
			}}
		>
			<div className="text-slate-100 flex flex-col gap-2 titles-container">
				<h3 className="text-4xl font-bold">{heroData.mainTitle}</h3>
				<h2 className="text-5xl font-bold max-w-screen-lg">
					{heroData.secondTitle}
				</h2>
				<h3 className="mt-4 max-w-screen-lg p-2 description-text rounded">
					Reg&iacute;strate y contacta con nuestro equipo de ventas para obtener
					los mejores precios y productos derivados de las grasas animales y
					aceites de palma, observa nuestros post y blogs con estudios,
					sugerencias y d&eacute;mas ...
				</h3>
			</div>
			<div className="text-slate-100 flex gap-2 flex flex-wrap steps-container">
				{isBrowser() && !useStore.token && (
					<>
						<span className="p-1 pr-2 border-solid border-slate-100 rounded border bg-black/80">
							<Link to="/Register" className="hover:text-[#60794d]">
								<b>paso 1:</b> reg&iacute;strate
							</Link>
						</span>
						<span className="p-1 pr-2 border-solid border-slate-100 rounded border bg-black/80">
							<b>paso 2:</b> obten la verificaci&oacute;n
						</span>
						<span className="p-1 pr-2 border-solid border-slate-100 rounded border bg-black/80">
							<b>paso 3:</b> realiza tu compra
						</span>
					</>
				)}
			</div>
		</header>
	);
}

export const query = graphql`
	query Hero {
		allSanityHero {
			nodes {
				mainImage {
					asset {
					filename
					resize(aspectRatio: 1.78, fit: COVER, format: WEBP, width: 1280, quality: 80) {
						src
					}
					url
					}
				}
				mainTitle
				secondTitle
			}
		}
	}
`;
