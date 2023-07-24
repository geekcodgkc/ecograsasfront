import { StateCreator, create } from "zustand";
import api from "../../utils/api";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export interface OrderStoreInterface {
	orders: [] | null;
	loading: boolean;
	error: string | null;
	getOrders: (id: string) => Promise<void>;
}

type MyPersist = (
	config: StateCreator<OrderStoreInterface>,
	options: PersistOptions<OrderStoreInterface>,
) => StateCreator<OrderStoreInterface>;

export const useOrderStore = create<OrderStoreInterface, []>(
	(persist as MyPersist)(
		(set): OrderStoreInterface => ({
			orders: null,
			loading: false,
			error: null,
			getOrders: async (id) => {
				set((state) => ({ ...state, loading: true }));
				try {
					const { data } = await api.get(`/orders/client/${id}`);
					set((state) => ({ ...state, orders: data, loading: false }));
				} catch (_error) {
					set((state) => ({
						...state,
						loading: false,
						error: "no se pudo optener las ordenes, intenta mas tarde",
					}));
				}
			},
		}),
		{
			name: "orderStorage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
