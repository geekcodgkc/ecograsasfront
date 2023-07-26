import React, { useState } from "react";
import CartModal from "../../components/CartModal";
import { useCartStore } from "../../store";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./index.scss";

export default function CartWrapper({ children }: React.PropsWithChildren) {
	const cartStore = useCartStore((store) => store);
	const [open, setOpen] = useState<boolean>(false);

	return (
		<>
			{children}
			{open && (
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
		</>
	);
}
