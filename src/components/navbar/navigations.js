import React, { Component } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { FAVORITES_ROUTE, FORECAST_ROUTE_WITH_ID } from '../../tools/routes';
import { DEFAULT_DESTINATION } from '../../tools/keys';

export const navigations = [
    {
        icon:<HomeOutlinedIcon />,
        name:'home',
        route:FORECAST_ROUTE_WITH_ID.replace(':id', DEFAULT_DESTINATION),
    }
    ,{
        icon:<FavoriteBorderIcon />,
        name:'favorites',
        route:FAVORITES_ROUTE,
    }
]