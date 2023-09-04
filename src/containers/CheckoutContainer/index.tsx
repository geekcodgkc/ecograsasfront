import React, { useState } from "react";
import "./index.scss";
import { useCartStore, useUserStore } from "../../store";
import { navigate } from "gatsby";
import ActionModal from "../../components/ActionModal";
import CartButtons from "../../components/CartButtons";

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
	img: string;
}

export default function CheckoutContainer() {
	const isBrowser = typeof window !== "undefined";
	const cartStore = useCartStore((store) => store);
	const userStore = useUserStore((store) => store);
	const [open, setOpen] = useState<boolean>(false);
	const total = isBrowser
		? cartStore.cart &&
		  Object.values(cartStore.cart).length > 0 &&
		  Object.values(cartStore.cart)
				.map((cart) => cart.price)
				.reduce((acc, curr) => {
					return acc + curr;
				})
		: 0;

	if (isBrowser && !userStore.token) {
		navigate("/login");
	}

	if (isBrowser && !userStore.userData?.verified) {
		navigate("/profile");
	}

	return (
		<div className="CheckoutContainer bg-slate-300 relative">
			{isBrowser && open && (
				<ActionModal
					handleClose={() => {
						setOpen(false);
						cartStore.setClose();
					}}
				/>
			)}
			<h2 className="font-bold text-4xl mb-8 text-center">
				Tu carrito de compras
			</h2>
			<div className="cartContainer">
				{isBrowser &&
					cartStore.cart &&
					Object.values(cartStore.cart).map((cartItem) => {
						return (
							<div
								key={cartItem.product.id}
								className="cartItem bg-slate-50 shadow-md p-2 rounded mt-4"
							>
								<div className="infoContainer">
									<h2 className="font-bold text-xl mb-4">
										{cartItem.product.name}
									</h2>
									<div className="orderDescription">
										<img
											src={cartItem.img}
											alt={"cart img"}
											width={84}
											height={84}
											className="rounded"
										/>
										<header>
											<h3 className="font-bold">Precion Unitaro</h3>
											<h3 className="font-bold">Cantidad</h3>
											<h3 className="font-bold">Total</h3>
										</header>
										<footer>
											<h3>
												{cartStore.productsCount >= 100
													? Object.values(cartItem.product.prices)[0]
													: cartStore.productsCount >= 10
													? Object.values(cartItem.product.prices)[1]
													: Object.values(cartItem.product.prices)[2]}
												$
											</h3>
											<h3>{cartItem.qty}</h3>
											<h3>{cartItem.price.toFixed(2)}$</h3>
										</footer>
									</div>
								</div>
								<CartButtons
									product={{
										Slug: {
											current: cartItem.product.name,
										},
										productImage: {
											asset: {
												resize: {
													src: cartItem.img,
												},
											},
										},
										productId: {
											current: cartItem.product.id,
										},
										productName: cartItem.product.name,
										prices: cartItem.product.prices,
										_id: cartItem.product._id,
										name: cartItem.product.name,
										status: true,
									}}
								/>
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
						if (isBrowser && cartStore.cart) {
							setOpen(true);
						} else {
							navigate("/products");
						}
					}}
					onKeyDown={() => {}}
				>
					{isBrowser && cartStore.cart
						? "Crear la Orden"
						: "No tienes nada en el carrito regresa a la lista"}
				</button>
			</footer>
		</div>
	);
}
