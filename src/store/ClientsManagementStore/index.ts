import { StateCreator, create } from "zustand";
import api from "../../utils/api";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";
import { ConfigStoreInterface } from "../ConfigStore";

enum Condition {
	p1 = 1,
	p2 = 2,
	p3 = 3,
	p4 = 4,
}

interface Seller {
	name: string;
	id: string;
	phone: string;
	email: string;
	password: string;
	isSuper: boolean;
}

export interface ClientInfo {
	rif: string;
	name: string;
	address: string;
	email: string;
	phone: number[];
	contact: string;
	conditionPrice: Condition;
	seller: Seller | null;
	taxpayer: boolean;
	verified: boolean;
	password: string;
	totalKg: number;
}

export interface ClientsManagementStoreInterface {
	clients: null | ClientInfo[];
	loading: boolean;
	getClients: () => Promise<void>;
}

type MyPersist = (
	config: StateCreator<ClientsManagementStoreInterface>,
	options: PersistOptions<ClientsManagementStoreInterface>,
) => StateCreator<ClientsManagementStoreInterface>;

export const useClientsManagementStore = create<
	ClientsManagementStoreInterface,
	[]
>(
	(persist as MyPersist)(
		(set, get): ClientsManagementStoreInterface => ({
			clients: null,
			loading: false,
			async getClients() {
				try {
					set((state) => ({ ...state, loading: true }));
					const { data } = await api.get("/clients?populated=true");
					set((state) => ({ ...state, clients: data.clients, loading: false }));
				} catch (error) {}
			},
		}),
		{
			name: "clientManagementStorage",
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
