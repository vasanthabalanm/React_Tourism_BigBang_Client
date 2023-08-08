import React from 'react'
import PackageDetails from '../AgentPages/PackageDetails';
import { Navigate } from 'react-router-dom';

function PackageDetailsRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'TravelAgent')
    return <PackageDetails/>;
  return<Navigate to='/'/>
}
export default PackageDetailsRouting