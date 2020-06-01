import React, { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloseIcon from '@material-ui/icons/Close';
const HandleError = ({ text }) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 20);
    return () => {};
  }, []);

  const close = () => {
    setLoaded(false);
    setTimeout(() => {
      dispatch({
        type: "HANDLE_ERROR",
        payload: false,
      });
    }, 200);
  };
  return (
    <div
      style={{
        opacity: loaded ? 1 : 0,
      }}
      className="error__box"
    >
      <section className="overlay"
      onClick = {() => close()}
      ></section>
      <section className="error__box__content flex__column">
        {/* <button></button> */}
        <ErrorOutlineIcon />
        <h3>{text}</h3>
      </section>
    </div>
  );
};
export default HandleError;
