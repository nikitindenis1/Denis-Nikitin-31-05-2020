import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForecastDay from "./ForecastDay";
import Loader from "../../parts/Loader";

//mobile slider for mobile
const ForecastMobileSlider = ({ list, celsius }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="forecast__mobile__slider">
      {list && list.length > 0? (
        <Slider {...settings}>
          {list.map((m, i) => {
            return <ForecastDay key={i} celsius={celsius} m={m} />;
          })}
        </Slider>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default ForecastMobileSlider;
