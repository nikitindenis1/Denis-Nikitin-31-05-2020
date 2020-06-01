import React, { useState } from "react";
import ForecastCityLoader from "./loaders/ForecastCityLoader";
import { getImageUrl, convertCelsius } from "../../../functions/functions";
import Loader from "../../parts/Loader";
import Fade from "react-reveal/Fade";

const ForecastCity = ({ current_conditions, location,celsius  }) => {
  const [img_loaded, setImgLoaded] = useState(false);
  return (
    <Fade clear>
{
     current_conditions && location ? (
        <section className="forecast__city flex__start">
          <figure className="flex__center">
            <img
              style={{
                opacity: img_loaded ? 1 : 0,
              }}
              onLoad={() => setImgLoaded(true)}
              src={getImageUrl(current_conditions.WeatherIcon)}
              alt=""
            />
            {!img_loaded ? <Loader className="round__loader" /> : ""}
          </figure>
          <span>
            <h3>{location.LocalizedName}</h3>
            {convertCelsius(current_conditions.Temperature.Imperial.Value, celsius)}
          
          </span>
        </section>
      ) : (
        <ForecastCityLoader />
        )}
    </Fade>
  )
};
export default ForecastCity;
