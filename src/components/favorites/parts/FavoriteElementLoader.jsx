import React, { Component } from 'react'
import Loader from '../../parts/Loader'

const FavoriteElementLoader = ({length}) => {
    return (
        [...Array(length).keys()].map((m,i) => {
            return   <div 
            key = {i}
            className='favorite__list__element favorite__list__element__loader'>
            <Loader />
    </div>
        })
  
    )
}
export default FavoriteElementLoader