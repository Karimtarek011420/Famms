import React, { useContext } from 'react'
import { athuContext } from '../../Context/athucontext'
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({children}) {
    const{token}=useContext(athuContext);
    if(!token){
        return <Navigate to='/Login'/>
    }
  return <>
  {children}
  </>
}
