import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { FORECAST_ROUTE } from '../../tools/routes'
const NoMatch = () => {
    console.log('redirected')
    return (
        <Redirect  to ={FORECAST_ROUTE}/>
    )
}

export default NoMatch