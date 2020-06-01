import React, { useState } from "react";
import { convertCelsius, getImageUrl } from "../../../functions/functions";
import moment from "moment";

const options = ["Day", "Night"];
const ForecastDay = ({ m, celsius }) => {
  let min_temp = m.Temperature.Minimum.Value;
  let max_temp = m.Temperature.Maximum.Value;
  const [time, setTime] = useState("Day");
  const [temp, setTemp] = useState(max_temp);
  const [icon, setIcon] = useState(m.Day.Icon);
  const [img_loaded, setImgLoaded] = useState(false);
  const [first_click, setFirstClick] = useState(false);

  //toggle day and night data
  const handleSelect = (value) => {
    if (!first_click) setFirstClick(true);
    setImgLoaded(false);
    switch (value) {
      case "Day":
        setTemp(max_temp);
        setIcon(m.Day.Icon);
        break;
      case "Night":
        setTemp(min_temp);
        setIcon(m.Night.Icon);
        break;

      default:
        break;
    }
    setTime(value);
  };
  return (
    <li className="forecast__day">
      <header className="flex__between">
        {options.map((option, i) => {
          return (
            <button
            id={time === option ? 'forecast__day__selected'  :''}
              key={i}
           
              onClick={() => (time !== option ? handleSelect(option) : "")}
            >
              {option}
            </button>
          );
        })}
      </header>
      <div
        style={{
          overflow: "hidden",
        }}
        className="forecast__day__info flex__column"
      >
        <span
          id={
            first_click
              ? time == "Day"
                ? "forecast__day--day"
                : time == "Night"
                ? "forecast__day--night"
                : ""
              : ""
          }
          className="flex__column"
        >
          <h3>{moment(m.Date).format("ddd")}</h3>
          <figure>
            <img
              onLoad={() => setImgLoaded(true)}
              style={{
                opacity: img_loaded ? 1 : 0,
              }}
              src={getImageUrl(icon)}
              alt=""
            />
          </figure>

          {convertCelsius(temp, celsius)}
        </span>
      </div>
    </li>
  );
};
export default ForecastDay;
