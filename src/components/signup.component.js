import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const SignUp = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e) => {
        const name = e.target.value;
        setName(name);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangePassword_confirmation = (e) => {
        const password_confirmation = e.target.value;
        setPassword_confirmation(password_confirmation);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        dispatch(register(name, email, password, password_confirmation))
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <form onSubmit={handleRegister} ref={form} >
            <h3>Sign Up</h3>
            {!successful && (
                <div>
                    <div className="form-group">
                        <label>Name</label>
                        <input 
                            type="text" 
                            className="form-control"
                            name="name"
                            value={name} 
                            onChange={onChangeName}
                            validations={[required]}
                            placeholder="Full name" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required]}
                            placeholder="Enter email" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                            placeholder="Enter password" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            name="password"
                            value={password_confirmation}
                            onChange={onChangePassword_confirmation}
                            validations={[required]} 
                            placeholder="Confirm password" 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
            )}
            {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
            )}
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
    );
};

export default SignUp;