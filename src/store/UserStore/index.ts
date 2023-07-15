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

export interface UserStoreInterface {
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
}

export const useUserStore = create<UserStoreInterface>((set) => ({
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
				name: null,
				isAdmin: false,
				loading: false,
				error: null,
				token: null,
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
				name: parsed.email,
				isAdmin: parsed.isAdmin,
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
			console.log(response);
			set((state) => ({ ...state, loading: false }));
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
			console.log(data);
			set((state) => ({ ...state, loading: false, zones: data }));
		} catch (e) {
			console.log(e);
			set((state) => ({ ...state, loading: false }));
		}
	},
}));
