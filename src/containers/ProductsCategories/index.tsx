import React from "react";
import CartWrapper from "../CartWrapper";
import ProductCart from "../../components/ProductSaleCard";
import { Helmet } from "react-helmet";

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

export default function ProductCategories({
	pageContext: context,
}: pageContext) {
	return (
		<>
			<CartWrapper>
			<Helmet>
				<title>{`ecograsas - ${context.sanityProducts[0].department}`}</title>
				<meta
					content={
						`categorria de ${context.sanityProducts[0].department.toLocaleLowerCase()} echos por procesadora ecograsas, productores de los mejores productos derivados del aceite de palma`
					}
					name="description"
				/>
			</Helmet>
				<div className="w-full pb-8 max-w-screen-xl mx-auto min-h-screen flex flex-wrap gap-y-4 relative items-start">
					{context.sanityProducts.map((e) => (
						<ProductCart key={e._id} product={e} />
					))}
				</div>
			</CartWrapper>
		</>
	);
}
