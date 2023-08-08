import React from "react";
import "./index.scss";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useUserStore, useCartStore } from "../../store";

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
	presentation?: string;
	descriptionsShort?: string;
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
	tax?: number;
	_id: string;
	name: string;
	status: boolean;
}

interface productCartProps {
	product: ProductCartInterface;
}

export default function CartButtons({ product }: productCartProps) {
	const userStore = useUserStore((store) => store);
	const cartStore = useCartStore((store) => store);

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
			img: product.productImage.asset.resize.src,
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
		const singlePrice = Object.values(product.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		const value = parseInt(e.target.value) ? parseInt(e.target.value) : 0;

		cartStore.addToCart({
			product: {
				name: product.name,
				id: product.productId.current,
				_id: product._id,
				prices: product.prices,
			},
			price: value * singlePrice,
			qty: value,
			img: product.productImage.asset.resize.src,
		});
	};

	const handleRemove = () => {
		cartStore.removeFromCart(product.productId.current);
	};

	return (
		<div className="orderNumberContainer">
			<div className="cartButton" onClick={handleLessToCart} onKeyUp={() => {}}>
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
			<div className="cartButton" onClick={handleAddToCart} onKeyUp={() => {}}>
				<AiOutlinePlusCircle />
			</div>
			<BsFillTrashFill onClick={handleRemove} />
		</div>
	);
}
