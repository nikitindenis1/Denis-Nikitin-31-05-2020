import React, { useState, useEffect, useRef } from "react";
import { DEFAULT_DESTINATION } from "../../../tools/keys";
import useOnClickOutside from "use-onclickoutside";
import { withRouter } from "react-router";
import { FORECAST_ROUTE_WITH_ID } from "../../../tools/routes";
import Fade from "react-reveal/Fade";
import { SearchApi, getCurrentLocationApi } from "../../../api/api";
import { isIOS } from "react-device-detect";

const ForecastSearch = (props) => {
  const { getForecast, showError } = props;
  const [value, setValue] = useState("");
  const [search_timeout, setSearchTimeout] = useState("");
  const [options, setOptions] = useState([]);
  const [active, setActive] = useState(false);
  const [language_error, setLangaugeError] = useState(false);

  //function for closing the search results list if use clicks outside the list
  const ref = useRef();
  useOnClickOutside(ref, active ? () => setActive(false) : "");

  //on mount, check if there is city name and id in the url.
  //if yes, set location, if not get location from user geolocation
  useEffect(() => {
    console.log(props.match.params.id);
    if (props.match.params.id) {
      getlocationFromParams();
    } else {
      getCurrentLocation();
    }

    return () => {};
  }, []);

  //getting user location
  //if user blocking location service, we setting the default location,
  const getCurrentLocation = () => {
    if (isIOS) return handleSelect(DEFAULT_DESTINATION);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          let lat = position.coords.latitude;
          let long = position.coords.longitude;
          const res = await getCurrentLocationApi(lat, long);
          if (res.ok) {
            handleSelect(res.result);
          } else {
            showError();
          }
        },
        function (error) {
          handleSelect(DEFAULT_DESTINATION);
        }
      );
    } else {
      handleSelect(DEFAULT_DESTINATION);
    }
  };
  //get the name and key of the location from the params
  const getlocationFromParams = () => {
    let Key = props.match.params.id;
    let LocalizedName = props.match.params.name;
    let location = {
      Key,
      LocalizedName,
    };
    handleSelect(location);
  };

  const handleChange = (value) => {
    //setting input value to state and running search function
    setValue(value);
    //if the input value is not english letters, set the result list to empty array,
    //showing error
    if (language_error) setLangaugeError(false);
    var english = /^[a-zA-Z\s]*$/;
    if (value && !english.test(value)) {
      setOptions([]);
      return setLangaugeError(true);
    }
    search(value);
  };

  const handleSelect = (location) => {
    //select one location from the list,
    if (location) {
      let name = location.LocalizedName;
      let id = location.Key;
      //push the selected location name to the url params
      props.history.push(
        FORECAST_ROUTE_WITH_ID.replace(":name", name).replace(":id", id)
      );
      setValue(name);
      //sending the selected location object to the main component in order to get the daily data,
      //and the current conditions
      getForecast(location);
      setActive(false);
    }
  };

  const search = (value) => {
    //making api request, in order to get the the autocmplete for the search input value
    //the timeout purpose is to wait 300 miliseconds before running the api request, after the user finishes typing,
    //the purpose is to prevent to frequent get requests.
    window.clearTimeout(search_timeout);
    const timeout = setTimeout(async () => {
      const res = await SearchApi(value);
      if (res.ok) {
        setOptions(res.result);
      } else {
        showError();
      }
    }, 200);
    setSearchTimeout(timeout);
  };

  const handleFocus = () => {
    setActive(true);
    setLangaugeError(false);
  };
  return (
    <section ref={ref} className="forecast__search">
      <section
        id={
          value && language_error ? "forecast__search__lang__error--active" : ""
        }
        className="forecast__search__lang__error"
      >
        Please insert only english words
      </section>
      <Fade top>
        <input
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          type="text"
          onFocus={() => handleFocus(true)}
          placeholder="Enter City..."
        />
      </Fade>
      <ul
        id={active ? "forecast__search__results--active" : ""}
        className="forecast__search__results"
      >
        {options && options.length > 0
          ? options.map((option, i) => {
              return (
                <li
                  key={option.Key}
                  onClick={() => handleSelect(option)}
                  className="flex__start"
                >
                  <p>{option.LocalizedName}</p>
                </li>
              );
            })
          : ""}
      </ul>
    </section>
  );
};
export default withRouter(ForecastSearch);
