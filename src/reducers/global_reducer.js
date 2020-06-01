
import {findObjectIndex, setBodyDarkMode} from '../functions/functions'

const initialState = {
  favorites: [],
  celsius:true,
  dark:false,
  handle_error:false
};

export default function (state = initialState, { payload, type }) {
  switch (type) {
    case "HANDLE_FAVORITES":
        let arr = [...state.favorites]
        let index = findObjectIndex(arr, 'key', payload.key)
        if(index >= 0){
            arr.splice(index, 1)
        }else{
            arr = [...arr, payload]
        }
      return {
        ...state,
        favorites: arr,
      };
      case "SET_FAVORITES":
      return {
        ...state,
        favorites: payload,
      };
      case "SET_CELSIUS":
        return {
          ...state,
          celsius: !state.celsius,
        };
        case "HANDLE_ERROR":
            return {
              ...state,
              handle_error: payload,
            };
        case "SET_DARK_MODE":
            
            setBodyDarkMode(payload)
            return {
              ...state,
              dark: payload,
            };
    default:
      return state;
  }
}
