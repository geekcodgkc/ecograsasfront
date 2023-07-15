import axios from "axios";

const api = axios.create({
	baseURL: "http://146.190.117.97/api-v1/",
	headers: {
		Authorization:
			"Bearer 3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
	},
});

export default api;
