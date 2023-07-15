import { create } from "zustand";
import api from "../../utils/api";
import { error } from "console";

interface LoginObject {
	user: string;
	password: string;
}

interface UserStoreInterface {
	token: null | string;
	name: null | string;
	loading: boolean;
	cart: [];
	error: null | string;
	login: (data: LoginObject, cb: () => Promise<void>) => Promise<void>;
	isAdmin: boolean;
	logout: () => Promise<void>;
}

export const useUserStore = create<UserStoreInterface>((set) => ({
	token: null,
	name: null,
	loading: false,
	cart: [],
	error: null,
	isAdmin: false,
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
}));
