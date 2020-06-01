import React, { Component } from "react";

const ForecastCityLoader = () => {
  return (
    <div className="forecast__city forecast__city__loader  flex__start">
      <section className="loader">
        <aside></aside>
      </section>
      <span>
      <section className="loader">
        <aside></aside>
      </section>
      <section className="loader">
        <aside></aside>
      </section>
      </span>
    </div>
  );
};
export default ForecastCityLoader;
