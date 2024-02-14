import { StateCreator, create } from "zustand";
import api from "../../utils/api";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export interface PricesScalesInterface {
	MinKg: number;
	_id: string;
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
	_id: null | string;
	getConfig: () => Promise<void>;
	updateConfig: (data: PricesScalesInterface[]) => Promise<void>;
	addDiscounts: (config: DiscountsInterface) => Promise<void>;
	changeOrder: (currIndex: number, nextIndex: number) => Promise<void>;
	remove: (index: number) => Promise<void>;
}

type MyPersist = (
	config: StateCreator<ConfigStoreInterface>,
	options: PersistOptions<ConfigStoreInterface>,
) => StateCreator<ConfigStoreInterface>;

export const useConfigStore = create<ConfigStoreInterface, []>(
	(persist as MyPersist)(
		(set, get): ConfigStoreInterface => ({
			PriceScales: null,
			Discounts: null,
			loading: false,
			_id: null,
			getConfig: async () => {
				try {
					set((state) => ({ ...state, loading: true }));
					const { data } = await api.get("/config");
					set((state) => ({
						...state,
						loading: false,
						Discounts: data.Discounts,
						PriceScales: data.PriceScales,
						_id: data._id,
					}));
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
			updateConfig: async (config) => {
				try {
					set((state) => ({ ...state, loading: true }));
					await api.put(`/config/${get()._id}`, {
						PriceScales: config,
					});
					const { data } = await api.get("/config");
					set((state) => ({
						...state,
						loading: false,
						Discounts: data.Discounts,
						PriceScales: data.PriceScales,
						_id: data._id,
					}));
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
			addDiscounts: async (data) => {
				try {
					set((state) => ({ ...state, loading: true }));
					const currentDiscounts = get().Discounts;
					const discounts = currentDiscounts
						? [...currentDiscounts, data]
						: [data];
					await api.put(`/config/${get()._id}`, {
						Discounts: discounts,
					});
					const { data: newData } = await api.get("/config");
					set((state) => ({
						...state,
						loading: false,
						Discounts: newData.Discounts,
					}));
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
			changeOrder: async (currIndex, nextIndex) => {
				try {
					set((state) => ({ ...state, loading: true }));
					const Discounts = get().Discounts;
					if (Discounts) {
						const dis = Discounts[currIndex];
						const newDiscounts = [
							...Discounts.slice(0, currIndex),
							...Discounts.slice(currIndex + 1, Discounts.length),
						];
						newDiscounts.splice(nextIndex, 0, dis);
						await api.put(`/config/${get()._id}`, {
							Discounts: newDiscounts,
						});
						set((state) => ({
							...state,
							loading: false,
							Discounts: [...newDiscounts],
						}));
					}
				} catch (error) {
					set((state) => ({ ...state, loading: false }));
				}
			},
			remove: async (index) => {
				try {
					set((state) => ({ ...state, loading: true }));
					const Discounts = get().Discounts;
					if (Discounts) {
						const newDiscounts = [
							...Discounts.slice(0, index),
							...Discounts.slice(index + 1, Discounts.length),
						];
						await api.put(`/config/${get()._id}`, {
							Discounts: newDiscounts,
						});
						set((state) => ({
							...state,
							loading: false,
							Discounts: [...newDiscounts],
						}));
					}
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
