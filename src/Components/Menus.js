import React, { useEffect } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
//import { fetchMenuList } from "../Services/API-services";

export default function Menus() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "id",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Menu ID",
    },
    {
      field: "menu_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Menu Name",
    },
    {
      field: "menu_url_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Menu URL Name",
    },
    {
      field: "menu_url",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Menu URL",
    },
    {
      field: "status",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Status",
      className: "text-center",
    },
    {
      field: "",
      header: "Action",
      className: "text-center",
      body: "buttonsTemplate",
    },
  ];

  const rows = [
    {
      id: "MENU001",
      menu_name: "Dashboard",
      menu_url_name: "dashboard",
      menu_url: "/dashboard",
      status: "Active",
    },
    {
      id: "MENU002",
      menu_name: "Reports",
      menu_url_name: "reports",
      menu_url: "/reports",
      status: "Active",
    },
    {
      id: "MENU003",
      menu_name: "Settings",
      menu_url_name: "settings",
      menu_url: "/settings",
      status: "Inactive",
    },
    {
      id: "MENU004",
      menu_name: "User Management",
      menu_url_name: "user-management",
      menu_url: "/user-management",
      status: "Active",
    },
    {
      id: "MENU005",
      menu_name: "Audit Logs",
      menu_url_name: "audit-logs",
      menu_url: "/audit-logs",
      status: "Inactive",
    },
  ];

//   useEffect(() => {
//     fetchList();
//   }, []);

  const handleAddMenu = () => {
    navigate("/AddMenu");
  };

//   function fetchList() {
//     var MenuList = [];
//     fetchMenuList({}, (res) => {
//       if (res.status === 200) {
//         MenuList = res.data;
//         console.log("MenuList->", MenuList);
//       }
//     });
//     console.log("MenuList->", MenuList);
//     return MenuList;
//   }

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
                        <div className="col-sm-9">
                          <h1 className="m-0 pageTitle">Menu Management</h1>
                        </div>
                        <div className="col-sm-3">
                          <div className="addUserBtnDiv">
                            <button
                              className="btn addUser"
                              type="button"
                              onClick={handleAddMenu}
                            >
                              <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="fontIcon"
                              />
                              Add New Menu
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
                          detailpage={"MenuDetails"}
                          editpage={"EditMenu"}
                          deletepage={"DeleteMenu"}
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
