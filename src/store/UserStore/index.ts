import { create } from "zustand";
import api from "../../utils/api";
import handleRegister from "./handleRegister";

interface LoginObject {
	user: string;
	password: string;
}

export interface zones {
	_id: string;
	ZIPCode: string;
	area: string;
	State: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface RegisterForm {
	rif: string;
	name: string;
	address: string;
	email: string;
	zone: string;
	phone: string;
	contact: string;
	password: string;
}

interface Zone {
	ZIPCode: string;
	area: string;
	State: string;
}

interface Seller {
	_id: string;
	name: string;
	phone: string;
	email: string;
}

interface UserData extends Omit<RegisterForm, "zone" | "phone" | "password"> {
	password?: string;
	phone: string[];
	zone: Zone;
	conditionPrice: number;
	seller: Seller;
	taxpayer: boolean;
	verified: boolean;
	_id: string;
}

export interface UserStoreInterface {
	_id: null | string;
	userData: null | UserData;
	id: null | string;
	token: null | string;
	name: null | string;
	loading: boolean;
	cart: [];
	error: null | string;
	isAdmin: boolean;
	zones: null | zones[];
	getZones: () => Promise<void>;
	login: (data: LoginObject, cb: () => Promise<void>) => Promise<void>;
	logout: () => Promise<void>;
	register: (data: RegisterForm, cb: () => Promise<void>) => Promise<void>;
	getUserData: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStoreInterface>((set) => ({
	_id: null,
	userData: null,
	id: null,
	token: null,
	name: null,
	loading: false,
	cart: [],
	error: null,
	isAdmin: false,
	zones: null,
	logout: async () => {
		set((state) => ({ ...state, loading: true }));
		try {
			await api.post("/user/logout");
			set((state) => ({
				...state,
				id: null,
				name: null,
				isAdmin: false,
				loading: false,
				error: null,
				token: null,
				_id: null,
			}));
		} catch (error) {}
	},
	login: async (data, cb) => {
		set((state) => ({ ...state, loading: true }));
		try {
			const loginResponse = await api.post("/user/login", data);
			function parseJwt(token: string) {
				return JSON.parse(atob(token.split(".")[1]));
			}
			const parsed = parseJwt(loginResponse.data.token);
			set((state) => ({
				...state,
				id: parsed.id,
				name: parsed.email,
				isAdmin: parsed.isAdmin,
				_id: parsed._id,
				loading: false,
				error: null,
				token: loginResponse.data.token,
			}));
			cb();
		} catch (e) {
			console.log(e);
			set((state) => ({
				...state,
				loading: false,
				error: "Usuario o Clave Invalidos",
			}));
		}
	},
	register: async (data, cb) => {
		set((state) => ({ ...state, loading: true }));
		try {
			const response = await handleRegister(data);
			set((state) => ({
				...state,
				id: response.res._id,
				loading: false,
				name: data.email,
				isAdmin: false,
				error: null,
				token: response.token,
			}));
			cb();
		} catch (error) {
			console.log(error);
			set((state) => ({
				...state,
				loading: false,
				error: JSON.stringify(error),
			}));
		}
	},
	getZones: async () => {
		set((state) => ({ ...state, loading: true }));
		try {
			const { data } = await api.get("/zones");
			set((state) => ({ ...state, loading: false, zones: data }));
		} catch (e) {
			console.log(e);
			set((state) => ({ ...state, loading: false }));
		}
	},
	getUserData: async (id) => {
		set((state) => ({ ...state, loading: true }));
		try {
			const { data } = await api.get(`clients/${id}?populated=true`);
			set((state) => ({ ...state, loading: false, userData: data }));
		} catch (error) {
			console.log(error);
			set((state) => ({ ...state, loading: false }));
		}
	},
}));
