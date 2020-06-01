import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./favorites.css";
import CloudOffIcon from "@material-ui/icons/CloudOff";
import { Link, withRouter } from "react-router-dom";
import { FORECAST_ROUTE, FORECAST_ROUTE_WITH_ID } from "../../tools/routes";
import FavoriteElement from "./parts/FavoriteElement";
import { getCurrentConditionsApi } from "../../api/api";
import FavoriteElementLoader from "./parts/FavoriteElementLoader";

const Favorites = (props) => {
  const [formated_favorites, setFormatedFavorites] = useState([]);
  const [favorite_to_remove, setFavoriteToRemove] = useState(false);
  const [loading, setLoading] = useState(false);
  //get values from the reducer
  const global = useSelector((state) => state.global);
  const favorites = global.favorites;
  const celsius = global.celsius;
  const dispatch = useDispatch();

  useEffect(() => {
    if (favorites.length > 0) {
      setLoading(true);
      getFavorites();
    }

    return () => {};
  }, []);
  const showError = () => {
    dispatch({
      type: "HANDLE_ERROR",
      payload: true,
    });
  };


 const toToCityDailyForecast = (elem) => {
     //select location and go to the home page -- /forecast
    props.history.push(FORECAST_ROUTE_WITH_ID
      .replace(':name', elem.name)
      .replace(':id', elem.key))
  }

//create an api request from every favorite location, to get the current conditions
  const getFavorites = async () => {
    let files = [...favorites];
    let arr = [];
    await Promise.all(
      files.map(async (file) => {
        const res = await getCurrentConditionsApi(file.key);
        if (res.ok) {
          console.log(res);
          let new_file = {
            ...res.data[0],
            key: file.key,
            name: file.name,
          };
          arr = [...arr, new_file];
        }
        else{
            showError()
        }
      })
    );
    setLoading(false);
    setFormatedFavorites(arr);
  };
  //remove favorites from the favorites list in the reducer
  const removeFromFavorites = (obj) => {
    dispatch({
      type: "HANDLE_FAVORITES",
      payload: obj,
    });
    setFavoriteToRemove(obj.key);
    setTimeout(() => {
      let new_formated_favorites = [...formated_favorites];
      new_formated_favorites = new_formated_favorites.filter(
        (m) => m.key !== obj.key
      );
      setFormatedFavorites(new_formated_favorites);
      setFavoriteToRemove("");
    }, 300);
  };

  return (
    <div className="favorites flex__column">
      {
        <ul className="favorites__list flex__start">
          {!loading && formated_favorites && formated_favorites.length > 0 ? (
            formated_favorites.map((m) => {
              return (
                <FavoriteElement
                toToCityDailyForecast = {toToCityDailyForecast}
                  key={m.key}
                  celsius={celsius}
                  favorite_to_remove={favorite_to_remove}
                  m={m}
                  removeFromFavorites={removeFromFavorites}
                />
              );
            })
          ) : loading ? (
            <FavoriteElementLoader length={favorites.length} />
          ) : (
            <div className="no__data">
              <CloudOffIcon />
              <p>Favorites not selected.</p>
              <p>
                Select city in the <Link to={FORECAST_ROUTE}>Homepage</Link>{" "}
              </p>
            </div>
          )}
        </ul>
      }
    </div>
  );
};
export default withRouter(Favorites);
