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
	removeFromCart: (id: string) => void;
	createOrder: (clientId: string, cart: { [key: string]: ProductSale }) => void;
	decrementFromCart: (id: string) => void;
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
				set((state) => ({
					...state,
					loading: false,
					cart: !state.cart
						? {
								[product.product.id]: product,
						  }
						: {
								...state.cart,
								[product.product.id]: product,
						  },
				}));
				set((state) => {
					console.log(product, state);
					return state;
				});
			},
			removeFromCart: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => {
					const current = { ...state };
					if (current.cart) {
						delete current.cart[product];
					}
					return current;
				});
			},
			decrementFromCart: (id) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => {
					const current = { ...state };
					if (current.cart?.[id]) current.cart[id].qty -= 1;
					return current;
				});
			},
			createOrder: (product) => {
				set((state) => ({ ...state, loading: true }));
				set((state) => ({ ...state, loading: false }));
			},
		}),
		{
			name: "cartStorage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
