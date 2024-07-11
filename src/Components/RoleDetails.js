import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ConvertFormat,
  DateFormatFunction,
} from "./HtmlComponents/CommonFunction";
export default function RoleDetails() {
  const [isLoading, setIsLoading] = useState(false);
  // const [role, setRole] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const path = window.location.pathname;
  const role = location.state ? location.state?.user : ""; //?.role_id
  const isDelete = path.includes("DeleteRole") ? true : false;

  useEffect(() => {
    // setIsLoading(true);
    // fetchUserById();
  }, []);

  //----------------------Get User--------------------------------------------
  function fetchUserById() {}
  //----------------------Delete User-----------------------------------------
  function DeleteUser() {}
  const rows = [
    {
      role_id: "RB001",
      role_name: "Admin",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
    {
      role_id: "RB002",
      role_name: "Maker",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
    {
      role_id: "RB003",
      role_name: "Checker",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
    {
      role_id: "RB004",
      role_name: "Operation Maker",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
    {
      role_id: "RB005",
      role_name: "Admin",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
    {
      role_id: "RB006",
      role_name: "Operation checker",
      role_description: "Role Description data ",
      created_by: "Admin",
    },
  ];
  // const role = rows.find((u) => u.role_id.toString() === role_id);

  if (!role) {
    return <p>Role not found.</p>;
  }
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
                      <div className="row UserDetails mt-3 makerFields">
                        {isDelete ? (
                          <h4 className="col-md-12 mb-5 mx-5">
                            Are you sure you want to delete this ?
                          </h4>
                        ) : (
                          ""
                        )}
                        <div className="col-md-12 p-0">
                          <table className="table customerDetails">
                            <tbody>
                              <tr>
                                <td className="col-md-3 UDCoulmns">
                                  <strong>Role ID:</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  {role?.role_id}
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  <strong>Role Name:</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  {role?.role_name}
                                </td>
                              </tr>
                              <tr>
                                <td className="col-md-3 UDCoulmns fieldColumn">
                                  <strong>Role Description:</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns fieldColumn">
                                  {role?.role_description}
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  <strong>Is Active:</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  {role?.is_active ? "Yes" : "No"}
                                </td>
                              </tr>
                              <tr>
                                <td className="col-md-3 UDCoulmns">
                                  <strong>Created By :</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  {role?.created_by}
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  <strong>Created Date :</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns">
                                  {DateFormatFunction(role?.created_date)}
                                </td>
                              </tr>
                              {/* <tr>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>Email ID:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                {customer.email_id}
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>Mobile No:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                {customer.mobile_no}
                              </td>
                            </tr> 
                            <tr>
                              <td className="col-md-3 UDCoulmns">
                                <strong>Remarks:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">
                                {customer.description}
                              </td>
                              <td className="col-md-3 UDCoulmns">
                                <strong>Is Active:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">
                                {customer.is_active ? "Yes" : "No"}
                              </td>
                            </tr>*/}
                            </tbody>
                          </table>

                          {/* ----------------------------------------------------------------------- */}
                          {/* <div className="col-md-6 mx-auto">
                          <div className="col-md-6 UDCoulmns">
                            <strong>Role ID :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {role?.role_id}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Role Description :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {role?.role_description}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Created Date :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {DateFormatFunction(role?.created_date)}
                          </div>
                        </div>
                      
                        <div className="col-md-5">
                          <div className="col-md-6 UDCoulmns">
                            <strong>Role Name :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {role?.role_name}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Created By :</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {role?.created_by}
                          </div>
                         </div> */}
                          {/* --------------------------------------------------------------------------- */}

                          <div class="col-md-12">
                            <div className="modal-footer">
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
                                    navigate(`/EditRole`, {
                                      state: { user: role },
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
        </div>
      </div>
    </div>
  );
}
