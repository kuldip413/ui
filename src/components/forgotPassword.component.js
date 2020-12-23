import React, { useState, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

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

const  ForgotPassword = (props) => {
    const form = useRef();
    const [email, setEmail] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const handleReset = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/password/reset-request",{email})
            .then(() => {
                props.history.push("/resetPassword");
                window.location.reload();
            });
    }
    return (
        <form onSubmit={handleReset} ref={form}>
            <h3>Forgot Password</h3>

            <div className="form-group">
                <label>Email address</label>
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
    );
};

export default ForgotPassword;