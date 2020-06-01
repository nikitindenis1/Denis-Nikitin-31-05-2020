
import React  from "react";

import { IMAGES_API } from "../tools/keys"



//convert celsius to fahrenheit, and reverse
export const convertCelsius = (value, celsius) => {
    let result = 0
    if(celsius) {
         result =  (value - 32) * 5 / 9
         result = <h4>{result.toFixed(0)}<small>°C</small></h4>
        }
    else result = <h4>{value.toFixed(0)}<small>°F</small></h4>
    return result
}


//get icon url for the forecasts 
export const  getImageUrl = (icon) => {
    let number = Number(icon) < 10 ? `0${icon}` : icon
    return `${IMAGES_API}/${number}-s.png`
}   

//find index in array by object key, like the findIndex function, but this one is supported by internet explorer.
export const findObjectIndex = (items, property, parameter) => {
    var index = -1;
    for (var i = 0; i < items.length; ++i) {
      if (items[i][property] == parameter) {
        return (index = i);
        break;
      }
    }
  };

  
  export const checkIfFavorite = (arr, key) => {   
    if(key) return arr.some(m => m.key === key)
  }

  export const setBodyDarkMode = (val) => {
      let body = document.querySelector('body')
      if(val) body.classList.add('dark__mode')
      else body.classList.remove('dark__mode')
  }