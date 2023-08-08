import React from 'react'
import { Navigate } from 'react-router-dom';
import AgentMain from '../AgentPages/AgentMain';

function TravelAgentRouting({token,role}) {
    token = sessionStorage.getItem("accessToken");
    role = sessionStorage.getItem("role")
    if((token != null) && role === 'TravelAgent')
    return <AgentMain/>;
  return<Navigate to='/'/>
}

export default TravelAgentRouting