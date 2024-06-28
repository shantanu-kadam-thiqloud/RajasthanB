import React from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";

export default function Roles() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role ID",
    },
    {
      field: "roleName",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role Name",
    },

    {
      field: "roleDescription",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Role Description",
    },
    // {
    //   field: "status",
    //   sortable: true,
    //   filter: true,
    //   showFilterMenu: false,
    //   header: "Status",
    //   className: "text-center",

    //   //body: "switchTemplate",
    {
      field: "",
      header: "Action",
      className: "text-center",
      body: "buttonsTemplate",
    },
  ];

  const rows = [
    {
      id: "RB001",
      roleName: "Admin",
      roleDescription: "Role Description data ",
    },
    {
      id: "RB002",
      roleName: "Maker",
      roleDescription: "Role Description data ",
    },
    {
      id: "RB003",
      roleName: "Checker",
      roleDescription: "Role Description data ",
    },
    {
      id: "RB004",
      roleName: "Operation Maker",
      roleDescription: "Role Description data ",
    },
    {
      id: "RB005",
      roleName: "Admin",
      roleDescription: "Role Description data ",
    },
    {
      id: "RB006",
      roleName: "Operation checker",
      roleDescription: "Role Description data ",
    },
  ];
  const HandleAddCustomer = () => {
    navigate("/AddRole");
  };
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
                          <h1 className="m-0 pageTitle">Role Management</h1>
                        </div>
                        <div className="col-sm-2">
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
                          data={rows} //{data} //
                          columns={columns}
                          detailpage={"RoleDetails"}
                          editpage={"EditRole"}
                          deletepage={"DeleteRole"}
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
