import React, { useState, useEffect, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";

import axios from "axios";
import authHeader from "../services/auth-header";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const GetUsers = () => {
	const [name, setName] = useState("");
	useEffect(() => {
		const email = JSON.parse(localStorage.getItem('email'));
		const userToken = JSON.parse(localStorage.getItem('userToken'));
		axios.get("http://localhost:8000/api/getUser?token="+ userToken.token + "&email=" + email.email)
			.then((response) => {
				setName(response.data.name);
			});
	},[]);

	return(
		<div>
			<h5>{name}</h5>
		</div>
	);
};

export default GetUsers;
