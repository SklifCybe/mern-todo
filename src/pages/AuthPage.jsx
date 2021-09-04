import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Route, NavLink, Redirect } from "react-router-dom";
import axios from "axios";

import { login, setAuthErrMessage, setForm } from "../store/actions/auth";
import { ErrorMessage } from "../components/ErrorMessage";

export function AuthPage() {
  const dispatch = useDispatch();
  const { email, password, errMessage } = useSelector(({ authPage }) => authPage);
  const history = useHistory();

  const formHandler = ({ target }) => {
    const name = target.name;
    const value = target.value;

    if (name === 'email') {
      dispatch(setForm(value, password));
    } else if (name === 'password') {
      dispatch(setForm(email, value));
    }
  };

  const onRegistration = async () => {
    try {
      await axios.post('/api/auth/registration', { email, password });

      dispatch(setForm('', ''));
      history.push('/login');

    } catch ({ response }) {
      dispatch(setAuthErrMessage(response.data.message));
    }
  };

  const onLogin = async () => {
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      const { token, userId } = data;

      dispatch(login(token, userId));
      dispatch(setForm('', ''));

      history.push('/content');
    } catch ({ response }) {
      dispatch(setAuthErrMessage(response.data.message));
    }
  };

  return (
    <>
      {errMessage && <ErrorMessage text={errMessage}/>}

      <div className="auth">
        <Route path="/login">
          <h3 className="title">Authorization</h3>
          <input type="text" name="email" placeholder="Email" value={email} onChange={formHandler}/>
          <input type="password" name="password" placeholder="Password" value={password} onChange={formHandler}/>
          <div className="buttons">
            <button className="auth-button" onClick={onLogin}>Enter</button>
            <NavLink to="/registration" className="help-ref">No account?</NavLink>
          </div>
        </Route>
        <Route path="/registration">
          <h3 className="title">Registration</h3>
          <input type="text" name="email" placeholder="Email" value={email} onChange={formHandler}/>
          <input type="password" name="password" placeholder="Password" value={password} onChange={formHandler}/>
          <div className="buttons">
            <button className="auth-button" onClick={onRegistration}>Registration</button>
            <NavLink to="/login" className="help-ref">Have an account?</NavLink>
          </div>
        </Route>
        <Redirect to="registration" />
      </div>
    </>
  );
}