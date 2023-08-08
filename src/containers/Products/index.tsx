import React, { useState, useEffect } from "react";
import { useUserStore } from "../../store";
import { useStaticQuery, graphql, navigate } from "gatsby";
import "./index.scss";
import { BiDownArrowAlt } from "react-icons/bi";
import ProductCart from "../../components/ProductSaleCard";
import CartWrapper from "../CartWrapper";

interface Sproducts {
	Slug: {
		current: string;
	};
	productImage: {
		asset: {
			resize: {
				src: string;
			};
		};
	};
	presentation: string;
	descriptionsShort: string;
	productId: {
		current: string;
	};
	productName: string;
	prices: {
		p1: number;
		p2: number;
		p3: number;
		p4: number;
	};
	tax: number;
	id: string;
	name: string;
	status: boolean;
	_id: string;
	department: string;
}

interface Context {
	sanityProducts: Sproducts[];
}

interface pageContext {
	pageContext: Context;
}

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

export default function Products({ pageContext: context }: pageContext) {
	const isBrowser = () => typeof window !== "undefined";
	const { allSanityImageAssets } = useStaticQuery(imageQuery);
	const store = useUserStore((store) => store);
	const { sanityProducts } = context;
	const [current, setCurrent] = useState<number>(0);
	const [products, setProducts] = useState(sanityProducts);
	const [open, setOpen] = useState<boolean>(false);

	const filter = (number: number) => {
		const filter = sanityProducts.filter((p) => {
			return p.department.includes(`${options[number]}`);
		});
		setProducts(filter);
	};

	useEffect(() => {
		filter(current);
		return;
	}, [current]);

	if (isBrowser() && !store.token) {
		return (
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
							? filterImg("varios-pasteles-estantes-supermercados-venta.jpg")[0]
							: filterImg("JABONES.jpg")[0];

					return (
						<article
							key={name}
							className="w-full text-white mb-8 rounded articleBg"
							style={{
								backgroundImage: `url("${imgBackgound.mainImage.asset.resize.src}")`,
								backgroundPosition: "center",
							}}
							onClick={() => {
								navigate(`/Products/Categorias/${name.toLocaleLowerCase()}`);
							}}
							onKeyDown={() => {}}
						>
							<div className="articleContainerCategories p-12">
								<h3 className="font-bold text-5xl rounded">{name}</h3>
							</div>
						</article>
					);
				})}
			</div>
		);
	}

	return (
		<>
			<CartWrapper>
				<div className="w-full pb-8 max-w-screen-xl mx-auto min-h-screen flex flex-wrap gap-y-4 relative items-start">
					<div className="selectorContainer w-full mt-12 pl-4">
						<h3 className="font-bold">Categorias: </h3>
						<div className="selector">
							<div
								className="currentSelectorStatus"
								onClick={() => {
									setOpen(!open);
								}}
								onKeyDown={() => {}}
							>
								{current === 1
									? "PALMA"
									: current === 2
									? "MANTECA"
									: current === 3
									? "Manteca"
									: current === 4
									? "MARGARINA"
									: current === 5
									? "JABON"
									: "TODOS"}{" "}
								<BiDownArrowAlt
									className={`${open ? "arrowUpside" : "ArrowDown"}`}
								/>
							</div>

							{open && (
								<div className="optionsContainer">
									{options.map((name, i) => {
										return (
											<p
												className="optionContainer"
												key={i + Math.random()}
												onClick={() => {
													setCurrent(i);
													setOpen(false);
												}}
												onKeyDown={() => {}}
											>
												{name}
											</p>
										);
									})}
								</div>
							)}
						</div>
					</div>
					{(current === 0 ? sanityProducts : products).map((e) => (
						<ProductCart key={e._id} product={e} />
					))}
				</div>
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
