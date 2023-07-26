import React from "react";
import { Link, navigate } from "gatsby";
import { useUserStore, useCartStore } from "../../store";
import "./index.scss";

interface ProductCartInterface {
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
	_id: string;
	name: string;
	status: boolean;
}

interface productCartProps {
	product: ProductCartInterface;
}

export default function ProductCart({ product }: productCartProps) {
	const getMax = (a: number, b: number) => Math.max(a, b);
	const getMin = (a: number, b: number) => Math.min(a, b);

	const userStore = useUserStore((store) => store);
	const cartStore = useCartStore((store) => store);

	const min = Object.values(product.prices).reduce((acc, curr) => {
		return getMin(acc, curr === 0 ? acc : curr);
	});

	const max = Object.values(product.prices).reduce((acc, curr) => {
		return getMax(acc, curr === 0 ? acc : curr);
	});

	const handleAddToCart = () => {
		cartStore.addToCart({
			product: {
				name: product.name,
				id: product.productId.current,
				_id: product._id,
				prices: product.prices,
			},
			price: 1,
			qty: 1,
		});
	};

	return (
		<article
			className="w-full m-4 flex flex-wrap bg-slate-50 rounded shadow-lg max-w-screen-lg"
			id="articleContainer"
		>
			<Link to={`/Products/${product.Slug.current}`} className="w-fit h-fit">
				<img
					className="img-component hover:opacity-40 duration-150"
					src={product.productImage.asset.resize.src}
					alt={product.descriptionsShort}
					width={"250px"}
					height={"250px"}
					id={"img-card"}
				/>
			</Link>
			<div className="flex-1 pl-2 pt-2 h-full flex flex-wrap justify-start">
				<h2 className="w-full font-bold text-lg mb-4 hover:text-emerald-800">
					<Link to={`/Products/${product.Slug.current}`}>
						{product.productName}
					</Link>
				</h2>
				<p className="w-10/12 pr-2" id="shortDescription">
					{product.descriptionsShort}
				</p>
				{userStore.token ? (
					<div
						className="flex flex-wrap gap-y-2 justify-between w-full pr-4 align-center pb-4"
						id="itemsContainer"
					>
						<ul className="flex gap-4 mt-4 align-center">
							<li className="flex align-center gap-2">
								<b>Desde:</b>
								{` ${max}`}$
							</li>
							<li className="flex align-center gap-2">
								<b>Hasta:</b>
								{` ${min}`}$
							</li>
						</ul>
						<button
							className="action-button-1"
							type="button"
							name="add-to-cart-button"
							onClick={handleAddToCart}
						>
							Agregar al Carrito
						</button>
					</div>
				) : (
					<h4>
						<button
							type="button"
							className="action-button-1 self-end"
							onClick={() => {
								navigate("/Login");
							}}
						>
							Inicia Sesi&oacute;n Para ver los precios
						</button>
					</h4>
				)}
			</div>
		</article>
	);
}
