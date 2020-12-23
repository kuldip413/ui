import React, { useState, useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import ForgotPassword from "./components/forgotPassword.component";
import ResetPassword from "./components/resetPassword.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/BoardUser.component";
import BoardAdmin from "./components/BoardAdmin.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

const App = () => {
  const roles = JSON.parse(localStorage.getItem('roles'));
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      if(roles.includes("Admin") || roles.includes("NormalUser")){
        setCurrentUser(true);
      }
    }
  },[]);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if(localStorage.getItem('userToken')){
      if (roles.includes("Admin")) {
        setShowAdminBoard(true);
      }
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (<Router history={history}>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>UI</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </ul>
            {localStorage.getItem('userToken') ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/forgotPassword"} className="nav-link">
                    Reset Password
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/sign-in" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/sign-in"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/sign-up"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/resetPassword" component={ResetPassword} />
            <Route path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
};

export default App;