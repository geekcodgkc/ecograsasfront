import { create, StateCreator } from "zustand";
import api from "../../utils/api";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

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

export interface CartStoreInterface {
	loading: boolean;
	productsCount: number;
	open: boolean;
	cart: null | { [key: string]: ProductSale };
	addToCart: (product: ProductSale) => void;
	removeFromCart: (id: string) => void;
	createOrder: (
		clientId: string,
		shippingAddress: string,
		shippingDate: Date,
		clientPrice: number,
		cb: () => void,
	) => void;
	setClose: () => void;
	decrementFromCart: (id: string, less: number) => void;
}

export interface OrderProduct {
	product: string;
	price: number;
	qty: number;
}

interface OrderInterface {
	client: string;
	products: OrderProduct[];
	date: Date;
	shippingAddress: string;
	shippingDate: Date;
	orderTotal: number;
	iva: number;
	orderBase: number;
	status: number;
}

type MyPersist = (
	config: StateCreator<CartStoreInterface>,
	options: PersistOptions<CartStoreInterface>,
) => StateCreator<CartStoreInterface>;

export const useCartStore = create<CartStoreInterface, []>(
	(persist as MyPersist)(
		(set): CartStoreInterface => ({
			open: false,
			cart: null,
			loading: false,
			productsCount: 0,
			setClose: () => {
				set((state) => ({ ...state, open: false }));
			},
			addToCart: (product) => {
				set((state) => ({ ...state, loading: true }));

				set((state) => ({
					...state,
					cart: !state.cart
						? {
								[product.product.id]: product,
						  }
						: {
								...state.cart,
								[product.product.id]: product,
						  },
					open: true,
				}));

				set((state) => {
					const newState = { ...state, loading: false };
					if (state.cart) {
						console.log("ss");
						const count = Object.values(state.cart)
							.map((c) => c.qty)
							.reduce((acc, curr) => acc + curr);
						newState.productsCount = count;
						Object.entries(state.cart).forEach((entry) => {
							if (newState.cart) {
								newState.cart[entry[0]] = {
									...entry[1],
									price:
										count + 1 > 10
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[1]
													).toFixed(2),
											  )
											: count + 1 > 100
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[0]
													).toFixed(2),
											  )
											: parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[2]
													).toFixed(2),
											  ),
								};
								console.log(count, newState.cart[entry[0]]);
							}
						});
					} else {
						newState.productsCount = 0;
					}

					return newState;
				});
			},
			removeFromCart: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => {
					const current = { ...state };
					if (current.cart) {
						delete current.cart[product];
					}
					if (current.cart && Object.keys(current.cart).length < 1) {
						current.cart = null;
					}
					return current;
				});
				set((state) => {
					const newState = { ...state, loading: false };
					if (state.cart) {
						const count = Object.values(state.cart)
							.map((c) => c.qty)
							.reduce((acc, curr) => acc + curr);
						newState.productsCount = count;
						Object.entries(state.cart).forEach((entry) => {
							if (newState.cart) {
								newState.cart[entry[0]] = {
									...entry[1],
									price:
										count + 1 > 10
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[1]
													).toFixed(2),
											  )
											: count + 1 > 100
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[0]
													).toFixed(2),
											  )
											: parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[2]
													).toFixed(2),
											  ),
								};
							}
						});
					} else {
						newState.productsCount = 0;
					}

					return newState;
				});
			},
			decrementFromCart: (id, less) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => {
					const current = { ...state };
					if (current.cart?.[id]) {
						current.cart[id].qty -= 1;
						current.cart[id].price -= less;
					}
					return current;
				});
				set((state) => {
					const newState = { ...state, loading: false };
					if (state.cart) {
						const count = Object.values(state.cart)
							.map((c) => c.qty)
							.reduce((acc, curr) => acc + curr);
						newState.productsCount = count;
						Object.entries(state.cart).forEach((entry) => {
							if (newState.cart) {
								newState.cart[entry[0]] = {
									...entry[1],
									price:
										count + 1 >= 10
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[1]
													).toFixed(2),
											  )
											: count + 1 >= 100
											? parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[0]
													).toFixed(2),
											  )
											: parseFloat(
													(
														entry[1].qty *
														Object.values(entry[1].product.prices)[2]
													).toFixed(2),
											  ),
								};
							}
						});
					} else {
						newState.productsCount = 0;
					}

					return newState;
				});
			},
			createOrder: async (
				clientId,
				shippingAddress,
				shippingDate,
				clientPrice,
				cb,
			) => {
				const cart: ProductSale[] = [];
				set((state) => {
					if (state.cart) {
						Object.values(state.cart).forEach((e) => cart.push(e));
					}
					return { ...state, loading: true };
				});
				try {
					const order: OrderInterface = {
						client: "",
						products: [],
						date: new Date(),
						shippingAddress: "",
						shippingDate: new Date(),
						orderTotal: 0,
						iva: 0.0,
						orderBase: 0,
						status: 0,
					};
					order.client = clientId;
					order.shippingAddress = shippingAddress;
					order.shippingDate = shippingDate;

					cart.forEach((item) => {
						const singlePrice = Object.values(item.product.prices)[clientPrice];
						order.orderBase += parseFloat((singlePrice * item.qty).toFixed(2));
						order.orderTotal = parseFloat(
							(order.iva + order.orderBase).toFixed(2),
						);
						order.products.push({
							product: item.product._id,
							price: singlePrice,
							qty: item.qty,
						});
					});
					await api.post("/orders", order);
				} catch (_e) {
					set((state) => ({ ...state, loading: false }));
					return;
				}
				set((state) => ({ ...state, loading: false, cart: null }));
				cb();
			},
		}),
		{
			name: "cartStorage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
