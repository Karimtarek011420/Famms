import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const athuContext = createContext();

export default function Authcontext({ children }) {
    const [token, settoken] = useState(null);
    useEffect(() => {
      if(localStorage.getItem('ktn')!== null){
        settoken(localStorage.getItem('ktn'));
      }
    
      return () => {
      }
    }, [])
    
  return <athuContext.Provider value={{token,settoken}}>
    {children}
  </athuContext.Provider>;
}
