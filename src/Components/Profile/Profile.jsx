import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [name, setname] = useState(null)
  const [role, setrole] = useState(null)

  useEffect(() => {
  const {name,role} =jwtDecode(localStorage.getItem('ktn'))
  setname(name)
  setrole(role)
  
  }, [])
  return (
    <>
      <div className=" container py-5 text-center vh-100 ">
        <div className="row">
          <div className="col-md-12 shadow py-5">
            <h1 className="text-center"> My Profile</h1>
            <h3 className="text-center">Name : <span style={{color:" #2CB72E"}}>{name}</span></h3>
            <h3 className="text-center">Role : <span style={{color:" #2CB72E"}}>{role}</span></h3>

          </div>
        </div>
      </div>
    </>
  );
}
