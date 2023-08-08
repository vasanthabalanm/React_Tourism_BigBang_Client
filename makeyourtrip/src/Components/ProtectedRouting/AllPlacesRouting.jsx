import React from 'react'
import AllPlaes from '../AgentPages/AllPlaes';
import { Navigate } from 'react-router-dom';

function AllPlacesRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'TravelAgent')
    return <AllPlaes/>;
  return<Navigate to='/'/>
}

export default AllPlacesRouting