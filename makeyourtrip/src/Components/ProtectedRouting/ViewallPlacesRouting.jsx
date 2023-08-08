import React from 'react'
import Allspots from '../AgentPages/Allspots';
import { Navigate } from 'react-router-dom';

function ViewallPlacesRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'TravelAgent')
    return <Allspots/>;
  return<Navigate to='/'/>
}

export default ViewallPlacesRouting