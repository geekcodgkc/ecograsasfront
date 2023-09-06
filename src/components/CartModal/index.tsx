import React from "react";
import "./index.scss";
import { useCartStore, useUserStore } from "../../store";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { navigate } from "gatsby";
import CartButtons from "../CartButtons";

interface ModalProps {
	handleClose: () => void;
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

	return (
		<div className="modalBackground" onKeyDown={() => {}}>
			<div className="modalContainer bg-slate-300 relative">
				<div
					className="closeButton absolute"
					onClick={() => {
						cartStore.setClose();
						handleClose();
					}}
					onKeyDown={() => {}}
				>
					<AiOutlineCloseCircle />
				</div>
				<h2 className="font-bold text-3xl mb-8">Tu carrito de compras</h2>
				<div className="cartContainer">
					{cartStore.cart &&
						Object.values(cartStore.cart)
							.reverse()
							.map((cartItem) => {
								return (
									<div
										key={cartItem.product.id}
										className="cartItem bg-slate-50 shadow-md p-1 rounded flex w-full justify-around items-center flex-wrap gap-y-2"
									>
										<div className="productIMG flex gap-2 items-center">
											<img
												src={cartItem.img}
												alt="productName"
												width={80}
												height={80}
												className="rounded"
											/>
											<p className="font-medium max-w-xs">
												{cartItem.product.name}
											</p>
										</div>
										<div className="orderDescription">
											<header>
												<h3 className="font-bold">Cantidad</h3>
												<h3 className="font-bold">Precio Unitaro</h3>
												<h3 className="font-bold">Total</h3>
											</header>
											<footer>
												<h3>{cartItem.qty}</h3>
												<h3>
													{cartStore.productsCount >= 100
														? Object.values(cartItem.product.prices)[0]
														: cartStore.productsCount >= 10
														? Object.values(cartItem.product.prices)[1]
														: Object.values(cartItem.product.prices)[2]}
													$
												</h3>
												<h3>{cartItem.price.toFixed(2)}$</h3>
											</footer>
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
							if (!userStore.userData?.verified) {
								navigate("/Profile");
								return;
							}
							navigate("/Checkout");
						}}
						onKeyDown={() => {}}
					>
						{userStore.userData?.verified
							? "Proceder a la orden"
							: "necesitas verificacion"}
					</button>
				</footer>
			</div>
		</div>
	);
}
