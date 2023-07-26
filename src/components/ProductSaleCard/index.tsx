import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
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
		const singlePrice = Object.values(product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		cartStore.addToCart({
			product: {
				name: product.name,
				id: product.productId.current,
				_id: product._id,
				prices: product.prices,
			},
			price: cartStore.cart?.[product.productId.current]
				? cartStore.cart?.[product.productId.current].price + singlePrice
				: singlePrice,
			qty: cartStore.cart?.[product.productId.current]
				? cartStore.cart[product.productId.current].qty + 1
				: 1,
		});
	};

	const handleLessToCart = () => {
		const singlePrice = Object.values(product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];
		if (cartStore.cart) {
			cartStore.cart[product.productId.current].qty > 1
				? cartStore.decrementFromCart(product.productId.current, singlePrice)
				: handleRemove();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		cartStore.addToCart({
			product: {
				name: product.name,
				id: product.productId.current,
				_id: product._id,
				prices: product.prices,
			},
			price: 1,
			qty: parseInt(e.target.value),
		});
	};

	const handleRemove = () => {
		cartStore.removeFromCart(product.productId.current);
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
				{userStore.token && (
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
							<li className="flex align-center gap-2">
								<b>Presentacion:</b>
								{` ${product.presentation}`}
							</li>
						</ul>
						{!cartStore.cart || !cartStore.cart[product.productId.current] ? (
							<button
								className="action-button-1"
								type="button"
								name="add-to-cart-button"
								onClick={handleAddToCart}
							>
								Agregar al Carrito
							</button>
						) : (
							<div className="orderNumberContainer">
								<div
									className="cartButton"
									onClick={handleLessToCart}
									onKeyUp={() => {}}
								>
									<AiOutlineMinusCircle />
								</div>
								<div className="inputContainer">
									<input
										name="cart-qty"
										type="number"
										value={cartStore.cart?.[product.productId.current].qty}
										onChange={handleChange}
									/>
								</div>
								<div
									className="cartButton"
									onClick={handleAddToCart}
									onKeyUp={() => {}}
								>
									<AiOutlinePlusCircle />
								</div>
								<BsFillTrashFill onClick={handleRemove} />
							</div>
						)}
					</div>
				)}
				{!userStore.token && (
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
