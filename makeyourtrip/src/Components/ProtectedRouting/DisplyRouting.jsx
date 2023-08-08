import React from 'react'
import DisplayHotel from '../AgentPages/DisplayHotel';
import { Navigate } from 'react-router-dom';

function DisplyRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'TravelAgent')
    return <DisplayHotel/>;
  return<Navigate to='/'/>
}

export default DisplyRouting