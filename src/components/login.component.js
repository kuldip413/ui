import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setLoading(true);

        dispatch(login(email, password))
            .then(() => {
                props.history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return < Redirect to= "/profile" />;
    } 

    return (
        <form onSubmit={handleLogin} ref={form}>
            <h3>Sign In</h3>

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
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]} 
                />
            </div>

            <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Submit</span>
                </button>
            </div>
            {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
            )}
            <p className="forgot-password text-right">
                Forgot <a href="/forgotPassword">password?</a>
            </p>
        </form>
    );
};

export default Login;