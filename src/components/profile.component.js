import React, { useState, useEffect, useRef } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user.service";

import axios from "axios";
import authHeader from "../services/auth-header";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Profile = () => {

	const form = useRef();
    const checkBtn = useRef();

	const [content, setContent] = useState("");
	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [roles, setRoles] = useState("");
	const [createdBy, setCreatedBy] = useState("");
	const [emailVerified, setEmailVerified] = useState("");
	const [currentUser, setCurrentUser] = useState(false);
	const [verificationToken, setVerificationToken] = useState("");
	const [successful, setSuccessful] = useState(false);

	const onChangeToken = (e) => {
        const verificationToken = e.target.value;
        setVerificationToken(verificationToken);
    };

    const handleVerification = (e) => {
    	e.preventDefault();
    	axios.post(verificationToken)
    		.then(() => {
    			window.location.reload();
    		});

    };

    const userToken = JSON.parse(localStorage.getItem('userToken'));

    const requestVerification = () => {
    	axios.post("http://localhost:8000/api/email/request-verification?token="+ userToken.token);
    }

	useEffect(() => {
    	UserService.getProfile().then(
      		(response) => {
        		setId(response.data.id);
        		setName(response.data.name);
        		setEmail(response.data.email);
        		setRoles(response.data.roles);
        		setEmailVerified(response.data.email_verified_at);
      		},
      		(error) => {
        		const _content =
          			(error.response &&
            			error.response.data &&
            			error.response.data.message) ||
          			error.message ||
          			error.toString();

        	setContent(_content);
      		},
    	);
  	}, []);


  	localStorage.setItem("user", JSON.stringify(name));
  	localStorage.setItem("roles", JSON.stringify(roles));
  	localStorage.setItem("email_verified_at", JSON.stringify(emailVerified));

	return(
		<div className="container">
			{roles ? (
				<div>
					<header className="jumbotron">
		    			<h3>{name}</h3>
					</header>
					<p>
						<strong>Id:</strong>{id}
					</p>
					<p>
						<strong>Email:</strong>{email}
					</p>
					<p>
						<strong>Email Verified:</strong>{emailVerified}
					</p>
				</div>
			) : (
				<div>
					<form onSubmit={handleVerification} ref={form} >
						<h4>Kindly verify your email </h4>
						<div className="form-group">
			                <label>Link sent to email</label>
			                <input 
			                    type="name" 
			                    className="form-control"
			                    name="verificationToken"
			                    value={verificationToken}
			                    onChange={onChangeToken}
			                    validations={[required]} 
			                    placeholder="Enter Token" 
			                />
			            </div>
			            <button type="submit" className="btn btn-primary btn-block">Verify Token</button>
			        </form>
			        <div>
			        	<h7>If token expired kindly request for email verification again</h7>
			            <form onSubmit={requestVerification} ref={form}>
			            		<button type="submit" className="btn btn-primary btn-block">Request Verification</button>
			            </form>
		            </div>
				</div>
			)}
		</div>
	);
};

export default Profile;