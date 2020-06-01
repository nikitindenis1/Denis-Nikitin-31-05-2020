import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ForecastSearch from "./parts/ForecastSearch";
import "./forecast.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { getDailyForecastApi, getCurrentConditionsApi } from "../../api/api";
import ForecastDay from "./parts/ForecastDay";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ForecastDayLoader from "./parts/loaders/ForecastDayLoader";
import ForecastCity from "./parts/ForecastCity";
import { useSelector, useDispatch } from "react-redux";
import { checkIfFavorite } from "../../functions/functions";
import Sunny from "../../images/sunny.jpg";
import Night from "../../images/night.jpg";
import Button from "@material-ui/core/Button";
import ForecastMobileSlider from "./parts/ForecastMobileSlider";

const Forecast = () => {
  const [location, setLocation] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current_conditions, setCurrentConditions] = useState(false);
  const [bg_loaded, setBgLoaded] = useState(false);

  const dispatch = useDispatch();

  //getting values from the reducer
  const global = useSelector((state) => state.global);
  const favorites = global.favorites;
  const celsius = global.celsius;
  const dark = global.dark;

  const handleFavorites = () => {
    //updating the favorites list in the reducer
    let obj = {
      name: location.LocalizedName,
      key: location.Key,
    };
    dispatch({
      type: "HANDLE_FAVORITES",
      payload: obj,
    });
  };

  const showError = () => {
    //show error popup
    dispatch({
      type: "HANDLE_ERROR",
      payload: true,
    });
  };

  useEffect(() => {
    //set the img loading every time the ui color changes
    setBgLoaded(false);
    return () => {};
  }, [dark]);

  const getForecast = async (location) => {
    //getting the location object from the Forcastsearch component
    //clear previous forcast arr and show loaders
    setCurrentConditions(false);
    setForecast(false);
    setLoading(true);
    setLocation(location);
    let key = location.Key;
    // runing functions to get the new forcast data
    getCurrent(key);
    datDaily(key);
  };
  const datDaily = async (key) => {
    //get daily forcast for selected location
    const res = await getDailyForecastApi(key);
    if (res.ok) {
      setForecast(res.data.DailyForecasts);
      setLoading(false);
    } else {
      showError();
      setLoading(false);
    }
  };

  const getCurrent = async (key) => {
    //get current forcast for selected location
    const res = await getCurrentConditionsApi(key);
    if (res.ok) {
      setCurrentConditions(res.data[0] ? res.data[0] : false);
    } else {
      showError();
      setLoading(false);
    }
  };

  return (
    <div className="forecast">
      <ForecastSearch showError={showError} getForecast={getForecast} />

      <div className="forecast__content flex__column">
        <img
          style={{
            opacity: bg_loaded ? 0.7 : 0,
          }}
          onLoad={() => setBgLoaded(true)}
          src={dark ? Night : Sunny}
          alt=""
          className="forecast__content__bg"
        />
        <div className="forecast__content__top flex__between">
          <ForecastCity
            celsius={celsius}
            location={location}
            current_conditions={current_conditions}
          />
          <section
            onClick={() => handleFavorites()}
            className="forecast__favorite flex__center"
          >
            {checkIfFavorite(favorites, location.Key) ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
            <Button variant="contained" color="primary">
              {checkIfFavorite(favorites, location.Key)
                ? "Remove from favorites"
                : "Add to favorites"}
            </Button>
          </section>
        </div>

        {!loading ? (
          <ul className="forecast__content__list flex__between ">
            {forecast && forecast.length > 0
              ? forecast.map((m, i) => {
                  return <ForecastDay celsius={celsius} key={i} m={m} />;
                })
              : ""}
          </ul>
        ) : (
          <ForecastDayLoader />
        )}
        <ForecastMobileSlider list={forecast} celsius={celsius} />
      </div>
    </div>
  );
};
export default withRouter(Forecast);
