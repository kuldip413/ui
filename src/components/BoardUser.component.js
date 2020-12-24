import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
// import GetUsers from "./GetUsers.component";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


const BoardUser = (props) => {
	const form = useRef();
	const checkBtn = useRef();
	const [Id, setId] = useState("");
	const [email, setEmail] = useState("");

	const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeId = (e) => {
    	const Id = e.target.value;
    	setId(Id); 
    };

    const findUser = (e) => {
        e.preventDefault();
        localStorage.setItem("email", JSON.stringify(email));
        props.history.push("/GetUsers");
        window.location.reload();
    };

    const findById = (e) => {
    	e.preventDefault();
        localStorage.setItem("Id", JSON.stringify(Id));
        props.history.push("/getUsersById");
        window.location.reload();
    }
    const findAll = (e) => {
    	e.preventDefault();
    	props.history.push("/get");
        window.location.reload();
    }

	return(
			<div>
	        <form onSubmit=	{findUser} ref={form}>
	            <div className="form-group">
	                <label>Find user by email</label>
	                <input 
	                    type="email" 
	                    className="form-control"
	                    value={email}
	                    onChange={onChangeEmail}
	                    validations={[required]}
	                    placeholder="Enter email" />
	            </div>

	            <button type="submit" className="btn btn-primary btn-block">Submit</button>
	        </form>
	        <form onSubmit={findById} ref={form}>
	            <div className="form-group">
	                <label>Find user by id</label>
	                <input 
	                    type="text" 
	                    className="form-control" 
	                    value={Id}
	                    onChange={onChangeId}
	                    validations={[required]}
	                    placeholder="Enter id" />
	            </div>

	            <button type="submit" className="btn btn-primary btn-block float-right">Submit</button>
	        </form>
	        <form onSubmit= {findAll} ref={form}> 
	        	<h6>Find all users</h6>
	            <button 
	            	type="submit" className="btn btn-primary btn-block">find all users</button>
	        </form>
	    </div>
	);
};

export default BoardUser;