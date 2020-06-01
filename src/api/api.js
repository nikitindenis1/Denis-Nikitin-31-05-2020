
import axios from 'axios'
import { API, API_KEY } from '../tools/keys';





// the the currect conditions for location
export const getCurrentConditionsApi = (key) => new Promise(resolve => {
  
    axios.get(`${API}/currentconditions/v1/${key}?apikey=${API_KEY}`).then(res => {

        resolve({ok:true,data:res.data})
    }).catch(err => {
        resolve({ ok: false })
    })
})


//get 5 days forecast for location
export const getDailyForecastApi = (key) => new Promise(resolve => {
  
    axios.get(`${API}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}`).then(res => {

        resolve({ok:true,data:res.data})
    }).catch(err => {
        resolve({ ok: false })
    })
})

//search locations by string
export const SearchApi = (value) => new Promise(resolve => {
  
    axios.get(`${API}/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`).then(res => {

        resolve({ok:true,result:res.data})
    }).catch(err => {
      
        resolve({ ok: false })
    })
})

//get location by lat long coordinates
export const getCurrentLocationApi = (lat, long) => new Promise(resolve => {
  
    axios.get(`${API}/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${lat}, ${long}`).then(res => {

        resolve({ok:true,result:res.data})
    }).catch(err => {
      
        resolve({ ok: false })
    })
})

