import React, { useEffect, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Components/HtmlComponents/Spinner";
import { fetchRoles } from "../Services/API-services";

export default function Roles() {
  const navigate = useNavigate();
  const [Rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const columns = [
    {
      field: "role_id",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role ID",
    },
    {
      field: "role_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role Name",
    },
    {
      field: "role_description",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role Description",
    },
    {
      field: "created_by",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Created By",
      // className: "text-center",
    },
    {
      field: "",
      header: "Action",
      // className: "text-center",
      body: "buttonsTemplate",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const requestBody = {};
    fetchRoles(
      requestBody,
      (response) => {
        if (response.status === 200) {
          const list = response.data.responseListObject;
          setRows(list);
        }
      },
      (error) => {
        console.log("Error->", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    );
  }, []);

  const rows = [
    {
      roleId: "RB001",
      roleName: "Admin",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
    {
      roleId: "RB002",
      roleName: "Maker",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
    {
      roleId: "RB003",
      roleName: "Checker",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
    {
      roleId: "RB004",
      roleName: "Operation Maker",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
    {
      roleId: "RB005",
      roleName: "Admin",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
    {
      roleId: "RB006",
      roleName: "Operation checker",
      roleDescription: "Role Description data ",
      createdBy: "Admin",
    },
  ];
  const HandleAddCustomer = () => {
    navigate("/AddRole");
  };
  return (
    <div>
      <div className="content-wrapper ">
        <Spinner isLoading={isLoading} />
        <div className="content-header">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row alignCenter">
                        <div className="col-sm-9">
                          <h1 className="m-0 pageTitle">Role Management</h1>
                        </div>
                        <div className="col-sm-3">
                          <div className="addUserBtnDiv">
                            <button
                              className="btn addUser"
                              type="button"
                              onClick={HandleAddCustomer}
                            >
                              <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="fontIcon"
                              />
                              Add New Role
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tableDiv">
                        <GenericDataTable
                          data={Rows} //{data} //
                          columns={columns}
                          detailpage={"RoleDetails"}
                          editpage={"EditRole"}
                          deletepage={""} //{"DeleteRole"}
                          enablePagination={false}
                        />
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
