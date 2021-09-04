import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {logout} from '../store/actions/auth';

export function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { token } = useSelector(({authPage}) => authPage);

  const buttonHandler = () => {
    if (!!token) {
      dispatch(logout());
    } else {
      history.push('/login');
    }
  };

  return (
    <header>
      <div className="logo">mern todo</div>
      <div className="enter" onClick={buttonHandler}>
        {!!token ? 'Выйти' : 'Войти'}
      </div>
    </header>
  );
}