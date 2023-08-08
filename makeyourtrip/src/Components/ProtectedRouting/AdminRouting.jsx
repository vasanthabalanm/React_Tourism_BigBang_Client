import React from 'react'
import { Navigate } from 'react-router-dom'
import AdminIndex from '../AdminPage/AdminIndex';

function AdminRouting({token,role}) {
  token = sessionStorage.getItem("accessToken");
  role = sessionStorage.getItem("role")
  if((token != null)&&(role === 'Admin'))
  return <AdminIndex/>;
return<Navigate to='/'/>
}

export default AdminRouting