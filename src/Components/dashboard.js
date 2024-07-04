import React, { useEffect } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSessionStorage } from "./CommonComponents/cookieData";

export default function Dashboard() {
  const USER = getSessionStorage("USER");
  useEffect(() => {
    console.log("Data from session -> ", USER);
  }, []);

  return (
    <div>
      <div className="content-wrapper ">
        <div className="content-header">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row alignCenter">
                        <div className="col-sm-10">
                          <h1 className="m-0 pageTitle">Dashboard</h1>
                        </div>
                        <div className="col-sm-2">
                          {/* <button
                            type="button"
                            className="btn btn-block btn-primary"
                          >
                            <FontAwesomeIcon
                              className="fontIcon"
                              icon={faCirclePlus}
                              // className="MenuIcon"
                              // id="logoutbutton"
                              onClick={() => {
                                //   logout();
                              }}
                            />
                            Add New User
                          </button> */}
                        </div>
                      </div>
                    </div>
                    <div className="card-body"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
