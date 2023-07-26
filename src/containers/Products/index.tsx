import React from "react";
import "./index.scss";
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
}

interface Context {
	sanityProducts: Sproducts[];
}

interface pageContext {
	pageContext: Context;
}

export default function Products({ pageContext: context }: pageContext) {
	const { sanityProducts } = context;

	console.log(sanityProducts);

	return (
		<>
			<CartWrapper>
				<div className="w-full pb-8 max-w-screen-xl mx-auto flex flex-wrap gap-y-4 relative">
					{sanityProducts.map((e) => (
						<ProductCart key={e._id} product={e} />
					))}
				</div>
			</CartWrapper>
		</>
	);
}
