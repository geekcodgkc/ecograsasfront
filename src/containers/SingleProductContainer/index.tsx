import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { BsFillTrashFill } from "react-icons/bs";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import CartWrapper from "../CartWrapper";
import "./index.scss";
import { useCartStore, useUserStore } from "../../store";
import { navigate } from "gatsby";

interface text {
	text: string;
}

interface Children {
	children: text[];
	_type: string;
}

interface pageContext {
	pageContext: {
		slug: string;
		_id: string;
		productData: {
			prices: {
				p1: number;
				p2: number;
				p3: number;
				p4: number;
			};
			id: string;
		};
	};
	data: {
		sanityProducts: {
			descriptionsFull: Children[];
			presentation: string;
			productImage: {
				asset: {
					resize: {
						src: string;
					};
				};
			};
			productName: string;
			descriptionsShort: string;
			productId: {
				current: string;
			};
		};
	};
}

export default function SingleProduct({ data, pageContext }: pageContext) {
	const getMax = (a: number, b: number) => Math.max(a, b);
	const getMin = (a: number, b: number) => Math.min(a, b);

	const userStore = useUserStore((store) => store);
	const cartStore = useCartStore((store) => store);
	const { sanityProducts: product } = data;

	const min = Object.values(pageContext.productData.prices).reduce(
		(acc, curr) => {
			return getMin(acc, curr === 0 ? acc : curr);
		},
	);

	const max = Object.values(pageContext.productData.prices).reduce(
		(acc, curr) => {
			return getMax(acc, curr === 0 ? acc : curr);
		},
	);

	const handleAddToCart = () => {
		const singlePrice = Object.values(pageContext.productData.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		cartStore.addToCart({
			product: {
				name: product.productName,
				id: product.productId.current,
				_id: pageContext._id,
				prices: pageContext.productData.prices,
			},
			price: cartStore.cart?.[product.productId.current]
				? parseFloat(
						(
							cartStore.cart?.[product.productId.current].price + singlePrice
						).toFixed(2),
				  )
				: singlePrice,
			qty: cartStore.cart?.[product.productId.current]
				? cartStore.cart[product.productId.current].qty + 1
				: 1,
		});
	};

	const handleLessToCart = () => {
		const singlePrice = Object.values(pageContext.productData.prices)[
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
		const singlePrice = Object.values(pageContext.productData.prices)[
			userStore.userData?.conditionPrice
				? userStore.userData?.conditionPrice - 1
				: 0
		];

		const value = parseInt(e.target.value) ? parseInt(e.target.value) : 0;

		cartStore.addToCart({
			product: {
				name: product.productName,
				id: product.productId.current,
				_id: pageContext._id,
				prices: pageContext.productData.prices,
			},
			price: parseFloat((value * singlePrice).toFixed(2)),
			qty: value,
		});
	};

	const handleRemove = () => {
		cartStore.removeFromCart(product.productId.current);
	};

	return (
		<CartWrapper>
			<div
				className="w-full p-8 max-w-screen-xl mx-auto bg-slate-50"
				id="singleProductCon"
			>
				<header className="flex flex-wrap gap-8 mb-8 singleHeader">
					<h3 className="font-bold text-2xl smallTitle">
						{product.productName}
					</h3>
					<img
						className="rounded shadow-lg"
						alt={product.productName}
						width={500}
						height={500}
						src={product.productImage.asset.resize.src}
					/>
					<div className="flex flex-col flex-1 flex-wrap dataContainer">
						<h3 className="font-bold text-2xl">{product.productName}</h3>
						<p className="mt-12 max-w-full w-9/12">
							{product.descriptionsShort}
						</p>
						{userStore.token && (
							<div
								className="flex flex-wrap gap-y-2 justify-between w-9/12 flex-1 pr-4 align-center pb-4"
								id="itemsContainer"
							>
								<ul className="flex gap-4 mt-4 align-center flex-wrap">
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
								{!cartStore.cart ||
								!cartStore.cart[product.productId.current] ? (
									<div className="flex items-center justify-center w-9/12 justify-self-center dataButton">
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
									<>
										<div className="orderNumberContainer w-9/12 justify-center dataButton">
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
													value={
														cartStore.cart?.[product.productId.current].qty
													}
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
										<div className="flex w-9/12 justify-center gap-2 dataButton">
											<h4 className="font-bold">Sub-Total: </h4>{" "}
											{cartStore?.cart[product.productId.current].price.toFixed(
												2,
											)}
										</div>
									</>
								)}
							</div>
						)}
						{!userStore.token && (
							<div className="flex flex-1 items-center w-full justify-center">
								<button
									type="button"
									className="action-button-1 self-end"
									onClick={() => {
										navigate("/Login");
									}}
								>
									Inicia Sesi&oacute;n Para ver los precios
								</button>
							</div>
						)}
					</div>
				</header>
				<article
					className="flex flex-wrap max-w-full w-9/12 mx-auto"
					id="articleContainer"
				>
					{product.descriptionsFull.map((text, i) => {
						if (text._type !== "block") {
							return (
								<h4 className="text-2xl font-bold mb-12">
									{text.children.map((t) => `${t.text}`)}
								</h4>
							);
						}

						return (
							<p key={`${Math.random()}${i}`} className="mb-8 text-justify">
								{text.children.map((t) => `${t.text}`)}
							</p>
						);
					})}
				</article>
			</div>
		</CartWrapper>
	);
}

export const query = graphql`
    query ss($slug: String) {
    sanityProducts(Slug: {current: {eq: $slug}}) {
            descriptionsFull {
                children {
                    text
                }
                _type
            }
            presentation
            productImage {
                asset {
                    resize(format: WEBP, height: 500, width: 500, quality: 80) {
                        src
                    }
                }
            }
            productName
            descriptionsShort
            productId {
                current
            }
        }
    }
`;
