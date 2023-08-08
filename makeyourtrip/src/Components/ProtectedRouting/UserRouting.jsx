import React from 'react'
import { Navigate } from 'react-router-dom';
import ManagePackage from '../Pages/ManagePackage';
import UserBooking from '../Booking/UserBooking';

function UserRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'User')
    return <UserBooking/>;
  return<Navigate to='/'/>
}

export default UserRouting