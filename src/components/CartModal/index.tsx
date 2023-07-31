import React from "react";
import "./index.scss";
import { useCartStore, useUserStore } from "../../store";
import {
	AiOutlinePlusCircle,
	AiOutlineMinusCircle,
	AiOutlineCloseCircle,
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { navigate } from "gatsby";

interface ModalProps {
	handleClose: () => void;
}

interface ProductSale {
	product: {
		name: string;
		id: string;
		_id: string;
		prices: {
			p1: number;
			p2: number;
			p3: number;
			p4: number;
		};
	};
	price: number;
	qty: number;
}

export default function CartModal({ handleClose }: ModalProps) {
	const cartStore = useCartStore((store) => store);
	const userStore = useUserStore((store) => store);
	const total =
		cartStore.cart &&
		Object.values(cartStore.cart).length > 0 &&
		Object.values(cartStore.cart)
			.map((cart) => cart.price)
			.reduce((acc, curr) => {
				return acc + curr;
			});

	const handleAddToCart = (product: ProductSale) => {
		const singlePrice = Object.values(product.product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		cartStore.addToCart({
			product: {
				name: product.product.name,
				id: product.product.id,
				_id: product.product._id,
				prices: product.product.prices,
			},
			price: cartStore.cart?.[product.product.id]
				? cartStore.cart?.[product.product.id].price + singlePrice
				: singlePrice,
			qty: cartStore.cart?.[product.product.id]
				? cartStore.cart[product.product.id].qty + 1
				: 1,
		});
	};

	const handleLessToCart = (product: ProductSale) => {
		const singlePrice = Object.values(product.product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];
		if (cartStore.cart) {
			cartStore.cart[product.product.id].qty > 1
				? cartStore.decrementFromCart(product.product.id, singlePrice)
				: handleRemove(product.product.id);
		}
	};

	const handleRemove = (id: string) => {
		cartStore.removeFromCart(id);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		product: ProductSale,
	) => {
		const singlePrice = Object.values(product.product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		const value = parseInt(e.target.value) ? parseInt(e.target.value) : 0;

		cartStore.addToCart({
			product: {
				name: product.product.name,
				id: product.product.id,
				_id: product.product._id,
				prices: product.product.prices,
			},
			price: value * singlePrice,
			qty: value,
		});
	};

	return (
		<div className="modalBackground" onKeyDown={() => {}}>
			<div className="modalContainer bg-slate-300 relative">
				<div
					className="closeButton absolute"
					onClick={handleClose}
					onKeyDown={() => {}}
				>
					<AiOutlineCloseCircle />
				</div>
				<h2 className="font-bold text-3xl mb-8">Tu carrito de compras</h2>
				<div className="cartContainer">
					{cartStore.cart &&
						Object.values(cartStore.cart).map((cartItem) => {
							return (
								<div
									key={cartItem.product.id}
									className="cartItem bg-slate-50 shadow-md p-2 rounded"
								>
									<h2 className="font-bold text-xl mb-4">
										{cartItem.product.name}
									</h2>
									<div className="orderDescription">
										<header>
											<h3 className="font-bold">Cantidad</h3>
											<h3 className="font-bold">Precion Unitaro</h3>
											<h3 className="font-bold">Total</h3>
										</header>
										<footer>
											<h3>{cartItem.qty}</h3>
											<h3>
												{Object.values(cartItem.product.prices)[
													userStore.userData?.conditionPrice
														? userStore.userData.conditionPrice - 1
														: 1
												].toFixed(2)}
												$
											</h3>
											<h3>{cartItem.price.toFixed(2)}$</h3>
										</footer>
									</div>
									<div className="orderNumberContainer mt-4 justify-end pr-4">
										<div
											className="cartButton"
											onClick={() => {
												handleLessToCart(cartItem);
											}}
											onKeyUp={() => {}}
										>
											<AiOutlineMinusCircle />
										</div>
										<div className="inputContainer">
											<input
												maxLength={4}
												name="cart-qty"
												type="number"
												value={cartStore.cart?.[cartItem.product.id].qty}
												onChange={(e) => {
													handleChange(e, cartItem);
												}}
											/>
										</div>
										<div
											className="cartButton"
											onClick={() => {
												handleAddToCart(cartItem);
											}}
											onKeyUp={() => {}}
										>
											<AiOutlinePlusCircle />
										</div>
										<BsFillTrashFill
											onClick={() => {
												handleRemove(cartItem.product.id);
											}}
										/>
									</div>
								</div>
							);
						})}
				</div>
				<footer className="w-full flex flex-wrap justify-between mt-4 items-center gap-y-2">
					<h3 className="font-bold text-xl p-2 bg-slate-50 rounded">
						Total: {(typeof total === "number" && total?.toFixed(2)) || 0}$
					</h3>
					<button
						className="action-button-1"
						type="button"
						onClick={() => {
							navigate("/Checkout");
						}}
						onKeyDown={() => {}}
					>
						Proceder a la orden
					</button>
				</footer>
			</div>
		</div>
	);
}
