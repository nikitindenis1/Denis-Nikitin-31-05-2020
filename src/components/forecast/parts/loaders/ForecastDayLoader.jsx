import React, { Component } from "react";

const ForecastDayLoader = () => {
  return (
    <ul className="forecast__content__list flex__between forecast__content__list__loader">
      {[...Array(5).keys()].map((m, i) => {
        return <li 
        key = {i}
        className="forecast__day loader">
            <aside></aside>
        </li>;
      })}
      
    </ul>
  );
};

export default ForecastDayLoader