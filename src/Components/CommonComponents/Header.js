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
  const [logoutTimer, setLogoutTimer] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/" ? true : false;
  const lastSessionStorage = sessionStorage.getItem("USER");
  const USER = getSessionStorage("USER");
  // useEffect(() => {
  //   const fetchLoginData = async () => {
  //     try {
  //       const cookieLoginData = await getUserDataFromCookie();
  //       // const decryptedData = await decryptData(cookieLoginData);
  //       // if(!cookieLoginData && !isLogin){
  //       //  window.location.href = "/SupportTool";
  //       // }
  //       setLoginData(cookieLoginData);
  //     } catch (error) {
  //       console.error("Error fetching login data:", error);
  //     }
  //   };
  //   fetchLoginData();
  // }, [isLogin]);

  useEffect(() => {
    if (!USER && !isLogin) {
      // window.location.href = "/rjsbcl";
    }
  }, []);

  useEffect(() => {
    const checkSessionStorage = () => {
      if (!isLogin) {
        const currentSessionValue = sessionStorage.getItem("USER");
        if (currentSessionValue !== lastSessionStorage) {
          removeUserDataSession();
          window.location.href = "/rjsbcl";
        }
      }
    };
    const intervalId = setInterval(checkSessionStorage, 1000);
    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [lastSessionStorage, isLogin]);

  useEffect(() => {
    let idleTimer;
    let confirmationTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      clearTimeout(confirmationTimer);

      //  idleTimer = setTimeout(logoutUser, 2 * 60 * 1000); // 2 minutes
      idleTimer = !isLogin ? setTimeout(logoutUser, 15 * 60 * 1000) : null;
      setLogoutTimer(idleTimer);

      // Show confirmation 1 minute before logout
      confirmationTimer = !isLogin
        ? setTimeout(() => setShowConfirmation(true), (15 * 60 - 60) * 1000)
        : null;
    };

    const logoutUser = () => {
      logout();
      console.log("User has been logged out due to inactivity");
    };

    const handleActivity = () => {
      resetIdleTimer();
      setShowConfirmation(false);
    };

    // Event listeners for user activity
    const resetIdleTimerOnEvents = ["mousemove", "keypress"];

    resetIdleTimerOnEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    resetIdleTimer();

    // Cleanup
    return () => {
      clearTimeout(idleTimer);
      clearTimeout(confirmationTimer);
      resetIdleTimerOnEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isLogin]);

  const handleConfirmation = () => {
    clearTimeout(logoutTimer);
    setShowConfirmation(false);
  };

  const removeUserDataSession = () => {
    sessionStorage.removeItem("USER");
    sessionStorage.removeItem("AUTHUSER");
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
      {showConfirmation && !isLogin && (
        <div className="overlay">
          <div className="log-container">
            <p>
              Your session will expire in one minute due to inactivity.
              <br />
              Would you like to continue?
            </p>
            <button className="btn btn-danger" onClick={handleConfirmation}>
              Yes
            </button>
          </div>
        </div>
      )}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {!isLogin && (
          <div className="container-fluid">
            <div className="d-flex w-100">
              <div className="col-md-9"></div>
              <div className="col-md-2 text-center">
                <div>Welcome, {USER?.firstName} </div>
                <div>Role: {USER?.role_name}</div>
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
