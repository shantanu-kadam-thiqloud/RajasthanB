import React from "react";
import error from "../Assets/img/notfound.jpg";
const NotFound = () => {
  return (
    <>
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
                            <h1 className="m-0 pageTitle">Page not found!</h1>
                          </div>
                          <div className="col-sm-2"></div>
                        </div>
                      </div>
                      <div className="card-body">
                        {" "}
                        <div className="row text-center">
                          {/* p-2 mt-4
                          <h3>Page not found ! </h3> */}
                          <div className="error-container">
                            <img
                              src={error}
                              alt="Error"
                              className="error-img"
                            />
                          </div>
                        </div>
                        <div className="float-end">
                          <button
                            className="btn BackBtn me-2"
                            onClick={() => {
                              window.history.back();
                            }}
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
