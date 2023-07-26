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
}

export interface CartStoreInterface {
	loading: boolean;
	cart: null | { [key: string]: ProductSale };
	addToCart: (product: ProductSale) => void;
	removeFromCart: (product: ProductSale) => void;
	createOrder: (clientId: string, cart: { [key: string]: ProductSale }) => void;
}

type MyPersist = (
	config: StateCreator<CartStoreInterface>,
	options: PersistOptions<CartStoreInterface>,
) => StateCreator<CartStoreInterface>;

export const useCartStore = create<CartStoreInterface, []>(
	(persist as MyPersist)(
		(set): CartStoreInterface => ({
			cart: null,
			loading: false,
			addToCart: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => {
					const currentState = { ...state };
					if (!currentState.cart) {
						currentState.cart = { [product.product.id]: product };
					} else {
						currentState.cart[product.product.id] = product;
					}
					return currentState;
				});
			},
			removeFromCart: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => ({ ...state, loading: false }));
			},
			createOrder: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => ({ ...state, loading: false }));
			},
		}),
		{
			name: "cartStorage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
