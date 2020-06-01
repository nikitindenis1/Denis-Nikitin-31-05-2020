import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {  useDispatch } from "react-redux";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import "./navbar.css";
import { navigations } from "./navigations";
import Togggle from "../parts/Toggle";
import MenuIcon from "@material-ui/icons/Menu";

const Navbar = (props) => {
  const [mobile_menu, setMobileMenu] = useState(false);
  const dispatch = useDispatch();
  //set degrees: celsius, or fahrenheit
  const handleDegrees = () => {
    dispatch({
      type: "SET_CELSIUS",
    });
  };
  //set mode: dark or light
  const handleDarkMode = (val) => {
    dispatch({
      type: "SET_DARK_MODE",
      payload: val,
    });
  };
  //only for mobile, toggle the navigation menu
  const toggleMobileMenu = (val) => {
    setMobileMenu(val);
  };
  //redirects to the selected route
  const goToRoute = (route) => {
    setMobileMenu(false);
    //if the current router location is the home page --  /forcast route, the home button is disabled
    if (
      route.indexOf("forecast") > -1 &&
      window.location.pathname.indexOf("forecast") > -1
    )
      return;
    props.history.push(route);
  };
  return (
    <nav className="navbar">
      <div className="navbar__flex flex__start">
        <section className="navbar__view__toggle flex__start">
          <button id="dark" onClick={() => handleDarkMode(true)}>
            <Brightness3Icon />
          </button>
          <button id="light" onClick={() => handleDarkMode(false)}>
            <WbSunnyIcon />
          </button>
        </section>
        <Togggle handleDarkMode={() => handleDegrees()} />
        <button
          onClick={() => toggleMobileMenu(!mobile_menu)}
          className="mobile__hamburger"
        >
          <MenuIcon />
        </button>
        <section
          id={mobile_menu ? "navbar__navigations--active" : ""}
          className="navbar__navigations flex__start"
        >
          {navigations.map((m, i) => {
            return (
              <Button
                onClick={() => goToRoute(m.route)}
                key={i}
                className="flex__center"
                variant="contained"
                color="primary"
              >
                {m.icon}
                <p>{m.name}</p>
              </Button>
            );
          })}
        </section>
      </div>
    </nav>
  );
};
export default withRouter(Navbar);
