import axios from "axios";
import authHeader from "./auth-header";

const API_URL= "http://localhost:8000/api/";


const getProfile = () => {
	return axios
		.get(API_URL + "profile", { headers: authHeader() })
};

const getUsers = () => {
	return axios
		.get(API_URL + "users", { headers: authHeader() })
};

// const requestVerification = () => {
// 	return axios
// 		.post(API_URL + "email/request-verification", {headers: authHeader()})

// };


export default {
	getProfile,
	getUsers,
	// requestVerification,
};