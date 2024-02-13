import { StateCreator, create } from "zustand";
import api from "../../utils/api";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export interface PricesScalesInterface {
	MinKg: number;
}

export interface DiscountsInterface {
	name: string;
	global: boolean;
	percent: number;
}

export interface ConfigUpdateForm {
	PriceScales?: PricesScalesInterface[];
	Discounts?: DiscountsInterface[];
}

export interface ConfigStoreInterface {
	PriceScales: null | PricesScalesInterface[];
	Discounts: null | DiscountsInterface[];
	loading: boolean;
	getConfig: () => Promise<void>;
	updateConfig: (data: ConfigUpdateForm) => Promise<void>;
}

type MyPersist = (
	config: StateCreator<ConfigStoreInterface>,
	options: PersistOptions<ConfigStoreInterface>,
) => StateCreator<ConfigStoreInterface>;

export const useConfigStore = create<ConfigStoreInterface, []>(
	(persist as MyPersist)(
		(set): ConfigStoreInterface => ({
			PriceScales: null,
			Discounts: null,
			loading: false,
			getConfig: async () => {
				try {
					set((state) => ({ ...state, loading: true }));
					const { data } = await api.get("/config");
					set((state) => ({
						...state,
						loading: false,
						Discounts: data.Discounts,
						PriceScales: data.PriceScales,
					}));
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
			updateConfig: async (data) => {
				try {
					console.log(data);
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
		}),
		{
			name: "configStorage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
