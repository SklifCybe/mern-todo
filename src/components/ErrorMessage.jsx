import React from 'react';
import { useDispatch } from "react-redux";
import { setAuthErrMessage } from "../store/actions/auth";

export function ErrorMessage({ text }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(setAuthErrMessage(''));
    }, 3000);
  }, [dispatch]);

  const close = () => {
    dispatch(setAuthErrMessage(''));
  };

  return (
    <>
      {
        text &&
        <div className="errorBlock">
          <div className="close" onClick={close}>[x]</div>
          <p>{text}</p>
        </div>
      }
    </>
  );
}