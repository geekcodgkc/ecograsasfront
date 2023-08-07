import React, { useState, useMemo, useEffect } from "react";
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

const options = ["TODOS", "PALMA", "MANTECA", "MARGARINA", "JABON"];

export default function Products({ pageContext: context }: pageContext) {
	const { sanityProducts } = context;
	const [current, setCurrent] = useState<number>(0);
	const [products, setProducts] = useState(sanityProducts);
	const [open, setOpen] = useState<boolean>(false);

	console.log(sanityProducts);

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
