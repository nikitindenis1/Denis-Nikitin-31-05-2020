import React, { useState } from 'react'
import { getImageUrl, convertCelsius } from '../../../functions/functions'
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const FavoriteElement = ({favorite_to_remove, m, celsius, removeFromFavorites, toToCityDailyForecast}) => {
    const [img_loaded, setImgLoaded] = useState(false)


    const select = (e) => {
        e.stopPropagation();
        toToCityDailyForecast(m)
    }
    const remove =(e) => {
        e.stopPropagation();
        removeFromFavorites(m)
    }
        return (
            <li
                onClick = {(e) => select(e)}
                  id={
                    favorite_to_remove === m.key
                      ? "favorites__list__remove"
                      : ""
                  }
                  
                  className="favorite__list__element flex__column"
                >
                  <button
                    className="favorites__list__remove__btn flex__center"
                    onClick={(e) => remove(e)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                  <h3>{m.name}</h3>
                  <figure>
                    <img 
                    style ={{
                        opacity:img_loaded ? 1  :0
                    }}
                    onLoad = {() => setImgLoaded(true)}
                    src={getImageUrl(m.WeatherIcon)} alt="" />
                  </figure>
                  {convertCelsius(m.Temperature.Imperial.Value, celsius)}
                  <h4>{m.WeatherText}</h4>
                </li>
        )
}

export default FavoriteElement