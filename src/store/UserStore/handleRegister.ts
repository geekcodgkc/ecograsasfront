import api from "../../utils/api";
import { RegisterForm } from "./index";

const handleRegister = async (form: RegisterForm) => {
	console.log(form);
	try {
		const { data: res } = await api.post("/clients", form);
		const { data: token } = await api.post("/user/login", {
			user: form.rif,
			password: form.password,
		});
		const parsedJWT = JSON.parse(atob(token.token.split(".")[1]));

		return { res, token: token.token, ...parsedJWT };
	} catch (error) {
		console.log(error);
		return error;
	}
};

export default handleRegister;
