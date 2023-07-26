import React, { useState } from "react";
import "./index.scss";
import ProductCart from "../../components/ProductSaleCard";
import { useCartStore } from "../../store/CartStore";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CartModal from "../../components/CartModal";

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
	const [open, setOpen] = useState<boolean>(false);
	const { sanityProducts } = context;
	const cartStore = useCartStore((store) => store);

	console.log(sanityProducts);

	return (
		<>
			<div className="w-full max-w-screen-xl mx-auto flex flex-wrap gap-y-4 relative">
				{sanityProducts.map((e) => (
					<ProductCart key={e._id} product={e} />
				))}
				{cartStore.cart && (
					<div
						className="cartButtonAbsolute"
						onClick={() => {
							setOpen(true);
						}}
						onKeyDown={() => {}}
					>
						<AiOutlineShoppingCart />
					</div>
				)}
			</div>
			{open && (
				<CartModal
					handleClose={() => {
						setOpen(false);
					}}
				/>
			)}
		</>
	);
}
