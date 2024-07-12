import React, { useState, useEffect } from "react";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getSessionStorage,
  getUserDataFromCookie,
} from "../CommonComponents/cookieData";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Header() {
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/" ? true : false;
  const lastSessionStorage = sessionStorage.getItem("USER");
  const USER = getSessionStorage("USER");
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
        console.error("Error fetching login data:", error);
      }
    };
    fetchLoginData();
  }, [isLogin]);

  useEffect(() => {
    if (!USER && !isLogin) {
      // window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const checkSessionStorage = () => {
      if (!isLogin) {
        const currentSessionValue = sessionStorage.getItem("USER");
        if (currentSessionValue !== lastSessionStorage) {
          removeUserDataSession();
          window.location.href = "/";
        }
      }
    };
    const intervalId = setInterval(checkSessionStorage, 1000);
    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [lastSessionStorage, isLogin]);

  const removeUserDataSession = () => {
    sessionStorage.removeItem("USER");
  };

  function logout() {
    sessionStorage.clear();
    toast.success("Logout successfully !", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/");
  }

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {!isLogin && (
          <div className="container-fluid">
            <div className="d-flex w-100">
              <div className="col-md-9"></div>
              <div className="col-md-2 text-center">
                <div>Welcome, {USER.firstName} </div>
                <div>Role: {USER.role_name}</div>
              </div>
              <div className="col-md-1 d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faPowerOff}
                  onClick={() => logout()}
                  style={{ color: "#f50f0f", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
