import axios from "axios";

const api = axios.create({
	baseURL: "https://api.geekcod.com/api-v1/",
	headers: {
		Authorization:
			"Bearer 3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
	},
});

export default api;
