import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoleDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // const user = users.find((u) => u.id.toString() === userId);
  const path = window.location.pathname;
  const userId = location.state ? location.state.user.id : ""; //useParams();
  const locationData = location.state ? location.state.user : {};
  const isDelete = path.includes("DeleteRole") ? true : false;

  useEffect(() => {
    // setIsLoading(true);
    // fetchUserById();
  }, []);

  if (!user) {
    return <p>User not found.</p>;
  }
  //----------------------Get User--------------------------------------------
  function fetchUserById() {}
  //----------------------Delete User-----------------------------------------
  function DeleteUser() {}
  const rows = [
    {
      id: "CUST001",
      fullName: "Mohit J Sharma ",
      accNo: "415689001",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST002",
      fullName: "Jhonson L Roy ",
      accNo: "415689002",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST003",
      fullName: "Martin M Starc ",
      accNo: "415689003",
      state: "Maharashtra",
      isActive: false,
    },
    {
      id: "CUST004",
      fullName: "Davin N Gyle ",
      accNo: "415689004",
      state: "Maharashtra",
      isActive: false,
    },
    {
      id: "CUST005",
      fullName: "Ashutosh A Sharma ",
      accNo: "415689005",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST006",
      fullName: "Abhishek B Sharma ",
      accNo: "415689006",
      state: "Maharashtra",
      isActive: true,
    },
  ];
  //const user = users.find((u) => u.id.toString() === userId);

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
                          <h1 className="m-0 pageTitle">
                            {isDelete ? "Delete Role" : "Role Details"}
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row UserDetails mt-3">
                        {isDelete ? (
                          <h4 className="col-md-12 mb-5 mx-5">
                            Are you sure you want to delete this ?
                          </h4>
                        ) : (
                          ""
                        )}
                        <div className="col-md-6 mx-auto">
                          <div className="col-md-6 UDCoulmns">
                            <strong>User Full Name :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.fullName}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Mobile Number :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.mobileNumber}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>EMail :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">{user.email}</div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Created Date :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {"createdDate"}
                          </div>
                        </div>
                        {/* -------------------------------------------------------- */}
                        <div className="col-md-5">
                          {/* <div className="col-md-6 UDCoulmns">
              <strong>User ID:</strong>
            </div>
            <div className="col-md-6 UDCoulmns">{user.userId}</div> */}
                          <div className="col-md-6 UDCoulmns">
                            <strong>User ID :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">{"User@123"}</div>
                          <div className="col-md-6 UDCoulmns">
                            <strong>Role :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">{"Admin"}</div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Status :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {/* {user.isActive ? "Yes" : "No"} */}
                            {true ? "Active" : "Inactive"}
                            {/* <input
                              name="isActive"
                              className="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              checked={user.isActive}
                              readOnly
                            /> */}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row float-right">
                        <button
                          className="btn BackBtn"
                          type="button"
                          onClick={() => {
                            navigate("/Role");
                          }}
                        >
                          Back to List
                        </button>

                        <button
                          className="btn addUser"
                          type="button"
                          onClick={() => {
                            if (isDelete) {
                              // DeleteUser();
                            } else {
                              navigate(`/EditUser`, {
                                state: { user },
                              });
                            }
                          }}
                        >
                          {isDelete ? "Delete" : "Edit"}
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
  );
}
