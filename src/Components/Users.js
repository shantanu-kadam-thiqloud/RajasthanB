import React, { useEffect, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
import { fetchUserList } from "../Services/API-services";

export default function Users() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState(null);

  const columns = [
    { field: "user_id", sortable: true, filter: true, showFilterMenu: false, header: "User ID" },
    { field: "first_name", sortable: true, filter: true, showFilterMenu: false, header: "First Name" },
    { field: "last_name", sortable: true, filter: true, showFilterMenu: false, header: "Last Name" },
    { field: "contact_no", sortable: true, filter: true, showFilterMenu: false, header: "Contact No" },
    { field: "email_id", sortable: true, filter: true, showFilterMenu: false, header: "Email ID" },
    { field: "user_name", sortable: true, filter: true, showFilterMenu: false, header: "Username" },
    { field: "is_active", sortable: true, filter: true, showFilterMenu: false, header: "Active Status", className: "text-center" },
    { field: "role_id", sortable: true, filter: true, showFilterMenu: false, header: "Role ID" },
    { field: "", header: "Action", className: "text-center", body: "buttonsTemplate" },
];

  useEffect(() => {
    function fetchList() {
      const baseUrl = "http://172.16.16.113:8080/kmbl-rsbcl-api";
      fetchUserList(`${baseUrl}/getallusers`, (response) => {
        if (response.status === 200) {
          setUserList(response.data.responseListObject);        
        }
      });
    }
    fetchList();
  }, []);

  const HandleAddCustomer = () => {
    navigate("/AddUser");
  };

  return (
    <div>
      <div className="content-wrapper">
        <div className="content-header">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row alignCenter">
                        <div className="col-sm-9">
                          <h1 className="m-0 pageTitle">User Management</h1>
                        </div>
                        <div className="col-sm-3">
                          <div className="addUserBtnDiv">
                            <button
                              className="btn addUser"
                              type="button"
                              onClick={HandleAddCustomer}
                            >
                              <FontAwesomeIcon icon={faCirclePlus} className="fontIcon" />
                              Add New User
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {userList ? (
                      <div className="card-body">
                        <div className="tableDiv">
                          <GenericDataTable
                            data={userList}
                            columns={columns}
                            detailpage={"UserDetails"}
                            editpage={"EditUser"}
                            deletepage={"DeleteUser"}
                            enablePagination={false}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="card-body">
                        <p>Loading data...</p>
                      </div>
                    )}
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
