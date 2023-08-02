import React, { useState } from "react";
import CartModal from "../../components/CartModal";
import { useCartStore, useUserStore } from "../../store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { navigate } from "gatsby";
import "./index.scss";

export default function CartWrapper({ children }: React.PropsWithChildren) {
	const cartStore = useCartStore((store) => store);
	const userStore = useUserStore((store) => store)
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			{children}
			{(open || cartStore.open) && (
				<CartModal
					handleClose={() => {
						setOpen(false);
					}}
				/>
			)}
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
			{userStore.token && <div
					className="cartButtonAbsoluteII"
					onClick={() => {
						navigate('/Products')
					}}
					onKeyDown={() => {}}
			>
				Haz tu pedido
			</div>}
		</>
	);
}
