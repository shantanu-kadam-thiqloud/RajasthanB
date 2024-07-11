import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { saveData } from "./../Services/API-services";
import { toast } from "react-toastify";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate();
  const location = useLocation();

  // const user = users.find((u) => u.id.toString() === userId);
  const path = window.location.pathname;
  const userId = location.state ? location.state.user.userId : ""; //useParams();
  const locationData = location.state ? location.state.user : {};
  const [user, setUser] = useState(location.state ? location.state.user : {});
  const isDelete = path.includes("DeleteUser") ? true : false;

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
  function DeleteUser() {
    const data = {
      utilityType: "user",
      makerId: "1",
      requestType: "delete",
      tableName: "txn_sb_users",
      existingValue: { user_id : userId },
      updatedValue: null,
      description: "Delete a user",
      createdBy: "Admin",
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    saveData(data, `${baseUrl}/makerRequest`, (response) => {
      if (response.data) {
        showCustomToast(
          response.data.message + ". Your Request Id is " + response.data.requestId,
          response.data.requestId
        );
      }
    });

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("Request ID copied to clipboard", {
          position: "top-right",
          autoClose: false,
        });
      });
    };

    const CustomToast = ({ closeToast, requestData, requestId }) => (
      <div>
        <div>{requestData}</div><br />
        <button className="btn BackBtn mr-3" onClick={() => copyToClipboard(requestId)}>
          Copy ID
        </button>
        <button className="btn addUser" onClick={() => closeToast()}>OK</button>
      </div>
    );
  
    const showCustomToast = (response, requestId) => {
      toast.success(<CustomToast requestData={response} requestId={requestId} />, {
        position: "top-center",
        autoClose: false,
        className: "custom-toast",
      });
    };


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
                            {isDelete ? "Delete User" : "User Details"}
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                    <div className="row UserDetails mt-3">
                        {isDelete ? (
                          <h4 className="col-md-12 mb-5 mx-5">
                            Are you sure you want to delete this?
                          </h4>
                        ) : (
                          ""
                        )}
                        <div className="col-md-6 mx-auto">
                          <div className="col-md-6 UDCoulmns">
                            <strong>First Name:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.first_name}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Last Name:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.last_name}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Mobile Number:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.contact_no}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Email:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.email_id}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Created Date:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {"created_date"}
                          </div>
                        </div>
                        {/* -------------------------------------------------------- */}
                        <div className="col-md-5">
                          <div className="col-md-6 UDCoulmns">
                            <strong>User ID:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.user_id}
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            <strong>Role:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.role_id}
                          </div>

                          <div className="col-md-6 UDCoulmns">
                            <strong>Status:</strong>
                          </div>
                          <div className="col-md-6 UDCoulmns">
                            {user.is_active ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                     
                      <div className="modal-footer">
                        <button
                          className="btn BackBtn"
                          type="button"
                          onClick={() => {
                            navigate("/User");
                          }}
                        >
                          Back to List
                        </button>

                        <button
                          className="btn addUser"
                          type="button"
                          onClick={() => {
                            if (isDelete) {
                               DeleteUser();
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
