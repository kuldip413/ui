import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import axios from "axios";

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

const ResetPassword = (props) =>{
    const form = useRef();

    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);

    const onChangeToken = (e) => {
        const token = e.target.value;
        setToken(token);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangePassword_confirmation = (e) => {
        const password_confirmation = e.target.value;
        setPassword_confirmation(password_confirmation);
    };

    const reset = (e) => {
        e.preventDefault();

        setSuccessful(false);

        axios.post(token,{
            password,
            password_confirmation,
        })
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };
    return (
        <div className="container">
            <form onSubmit={reset} ref={form} >
            {!successful && (
                <div>
                    <h4>change password </h4>
                    <div className="form-group">
                        <label>Link sent to email</label>
                        <input 
                            type="name" 
                            className="form-control"
                            name="verificationToken"
                            value={token}
                            onChange={onChangeToken}
                            validations={[required]} 
                            placeholder="Enter Token" 
                        />
                        <input 
                            type="name" 
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]} 
                            placeholder="New Password" 
                        />
                        <input 
                            type="name" 
                            className="form-control"
                            name="password_confirmation"
                            value={password_confirmation}
                            onChange={onChangePassword_confirmation}
                            validations={[required]} 
                            placeholder="Confirm Password" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </div>
            )}
            {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
            )}
            </form>
        </div>
    );
};

export default ResetPassword;