import React from "react";
import { useStaticQuery, graphql, navigate } from "gatsby";
import "./index.scss";
import CartWrapper from "../CartWrapper";
import { Helmet } from "react-helmet";

interface SanityImages {
	mainImage: {
		asset: {
			filename: string;
			resize: {
				src: string;
			};
		};
	};
}

const options = ["TODOS", "PALMA", "MANTECA", "MARGARINA", "JABON"];

export default function Products() {
	const isBrowser = () => typeof window !== "undefined";
	const { allSanityImageAssets } = useStaticQuery(imageQuery);

	return (
		<>
			<CartWrapper>
				<Helmet>
					<title>{"ecograsas - Productos"}</title>
					<meta
						content={
							"todos los productos de procesadora ecograsas, derivados del aceite de palma perfectos para la resposteria, panaderia y heladeria."
						}
						name="description"
					/>
				</Helmet>
				{isBrowser() && (
					<div className="w-full py-8 max-w-screen-xl mx-auto min-h-screen">
						{options.map((name, i) => {
							if (name === "TODOS") return;
							const filterImg = (name: string) => {
								return allSanityImageAssets.nodes.filter((n: SanityImages) => {
									return n.mainImage.asset.filename === name;
								});
							};

							const imgBackgound =
								i === 1
									? filterImg(
											"vista-superior-pescado-patatas-fritas-seleccion-salsas-cubiertos.jpg",
									  )[0]
									: i === 2
									? filterImg("helado-dulce-chocolate.jpg")[0]
									: i === 3
									? filterImg(
											"varios-pasteles-estantes-supermercados-venta.jpg",
									  )[0]
									: filterImg("JABONES.jpg")[0];

							return (
								<article
									key={name}
									className="w-full text-white mb-8 rounded articleBg"
									style={{
										backgroundImage: `url("${imgBackgound.mainImage.asset.resize.src}")`,
										backgroundPosition: "center",
										backgroundSize: "cover",
									}}
									onClick={() => {
										navigate(
											`/Products/categorias/${name.toLocaleLowerCase()}`,
										);
									}}
									onKeyDown={() => {}}
								>
									<div className="articleContainerCategories p-12">
										<h3 className="font-bold text-5xl rounded break-words">
											{name}
										</h3>
									</div>
								</article>
							);
						})}
					</div>
				)}
			</CartWrapper>
		</>
	);
}

export const imageQuery = graphql`
	query imgs {
	allSanityImageAssets {
			nodes {
				mainImage {
					asset {
						filename
						resize(format: WEBP, height: 600, quality: 70, width: 1024) {
							src
						}
					}
				}
			}
		}
	}
`;
