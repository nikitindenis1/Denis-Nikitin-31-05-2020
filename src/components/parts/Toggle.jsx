import React from 'react'
import Toggle from 'react-toggle'
import './parts.css'

const Togggle = ({left_icon, right_icon, handleDarkMode}) => {
    return <Toggle
      defaultChecked={false}
      icons={{
        checked: '°F',
        unchecked: '°C',
      }}
      onChange={handleDarkMode} />
  
}
export default Togggle