import React, { useState, useEffect } from "react";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserDataFromCookie } from "../CommonComponents/cookieData";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const isLogin = location.pathname === "/" ? true : false;

   useEffect(() => {    
    const fetchLoginData = async () => {
      try {
        const cookieLoginData = await getUserDataFromCookie();
        // const decryptedData = await decryptData(cookieLoginData);
        // if(!cookieLoginData && !isLogin){
        //  window.location.href = "/SupportTool";
        // }        
        setLoginData(cookieLoginData);
      } catch (error) {
        console.error('Error fetching login data:', error);
      }
    };
    fetchLoginData();
  }, [isLogin]);

  return (   
<div>
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {!isLogin && (
      <div className="container-fluid">
        <div className="d-flex w-100">
        <div className="col-md-9"></div>
          <div className="col-md-2 text-center">
            <div>Welcome, {loginData.firstName} </div>
            <div>Role: {loginData.userType}</div>
          </div>
          <div className="col-md-1 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faPowerOff}
              style={{ color: "#f50f0f", cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    )}
  </nav>
</div>

  );
}
