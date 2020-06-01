import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import "./App.css";
import Forecast from "./components/forecast/Forecast";
import {
  FORECAST_ROUTE,
  FORECAST_ROUTE_WITH_ID,
  FAVORITES_ROUTE,
} from "./tools/routes";
import Navbar from "./components/navbar/Navbar";
import Favorites from "./components/favorites/Favorites";
import { useSelector } from "react-redux";
import HandleError from "./components/parts/HandleError";


function App(props) {
  const global = useSelector((state) => state.global);
  const [page_loaded, setPageLoaded] = useState(false)
  const handle_error = global.handle_error;
  useEffect(() => {
    props.history.push(FORECAST_ROUTE)
    setPageLoaded(true)
     return () => {
       
     }
   }, [])
  return (
    page_loaded ? <div className="app">
      <Router>
        {handle_error ? (
          <HandleError text="An error has occurred. Please try again later." />
        ) : (
          ""
        )}
        <Navbar />
        <Switch>
          <Route
            exact
            path={[FORECAST_ROUTE, FORECAST_ROUTE_WITH_ID]}
            render={() => <Forecast />}
          />
          <Route exact path={FAVORITES_ROUTE} render={() => <Favorites />} />
        </Switch>
      </Router>
    </div> : null
  );
}

export default withRouter(App);
