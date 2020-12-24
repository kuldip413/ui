import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const register = (name, email, password, password_confirmation ) => {
	return axios.post(API_URL + "register", {
		name,
		email,
		password,
		password_confirmation,
	});
};

const login = (email, password) => {
	return axios
		.post(API_URL + "login", {
			email,
			password,
		})
		.then ((response) => {
			if(response.data.token){
				localStorage.setItem("userToken", JSON.stringify(response.data));
			}

			return response.data;
		});

};

const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("roles");
	localStorage.removeItem("userToken");
	localStorage.removeItem("email_verified_at");
	localStorage.removeItem("email");
	localStorage.removeItem("Id");
};

export default {
  register,
  login,
  logout,
};