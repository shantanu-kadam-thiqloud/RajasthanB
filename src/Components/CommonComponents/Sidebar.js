import React, { useState } from "react";
import LOGO from "../../Assets/img/kotak-mahindra-bank-logo.png";
import {
  faHouse,
  faFile,
  faCircleCheck,
  faUser,
  faUsers,
  faUserGear,
  faBars,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import sideData from "./sideBarData";
import { getSessionStorage } from "./cookieData";
import { fetchRoles } from "../../Services/API-services";
import { toast } from "react-toastify";
export default function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(window.location.pathname);
  const [isPendingApprovalOpen, setIsPendingApprovalOpen] = useState(false);
  const [toggleStates, setToggleStates] = useState({});
  const handlePendingApprovalClick = () => {
    setIsPendingApprovalOpen(!isPendingApprovalOpen);
    setActiveMenu("Pending Approval");
  };
  const USER = getSessionStorage("USER");
  const [menuData, setMenuData] = useState(sideData[0].data);
  // Initialize the toggle states based on JSON data
  roleId;
  const initializeToggleStates = () => {
    const initialState = {};
    (menuData || []).forEach((item) => {
      //data
      initialState[`item_${item.id}`] = false; // Initialize as false (not toggled)
    });
    setToggleStates(initialState);
  };

  // Call the initialization function when the component mounts
  React.useEffect(() => {
    if (menuData.length === 0) {
      const requestBody = {};
      fetchRoles(
        requestBody,
        (response) => {
          if (response.status === 200) {
            const list = response.data.responseListObject;
            // setRows(list);
            const menu_access = (list || []).find((x) => {
              if (x.role_id === USER.roleId) {
                const jsonMenu = JSON.parse(x?.menu_access || "[]");
                setMenuData(jsonMenu);
                return x.menu_access;
              }
            });
          }
        },
        (error) => {
          console.log("Error->", error.message);
          toast.error("Failed to get role ", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      );
    } else {
      // setIsLoading(false);
    }

    initializeToggleStates();
  }, [menuData]);

  const handleToggle = (itemId) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [`item_${itemId}`]: !prevState[`item_${itemId}`], // Toggle the state
    }));
  };
  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link bg-white">
          <img src={LOGO} alt="RB" className="brand-image  " />
          <div className="brand-text font-weight-light"></div>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* --------------Static-------------------------- */}
              {/* <li className="nav-item">
                <Link
                  to="/Dashboard"
                  className={
                    activeMenu === "/Dashboard"
                      ? `custom-link nav-link`
                      : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/Dashboard");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faHouse}
                    onClick={() => {}}
                  />

                  <p>Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/User"
                  className={
                    activeMenu === "/User" ? `custom-link nav-link` : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/User");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faUser}
                    onClick={() => {}}
                  />
                  <p>User Management</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Customers"
                  className={
                    activeMenu === "/Customers"
                      ? `custom-link nav-link`
                      : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/Customers");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faUsers}
                    onClick={() => {}}
                  />
                  <p>Customer Maintenance</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/Role"
                  className={
                    activeMenu === "/Role" ? `custom-link nav-link` : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/Role");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faUserGear}
                    onClick={() => {}}
                  />
                  <p>Role Management</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className={
                    activeMenu === "Report"
                      ? `custom-link nav-link`
                      : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/Report");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faFile}
                    onClick={() => {}}
                  />
                  <p>Report</p>
                </Link>
              </li>
              <li className="nav-item has-treeview">
                <Link
                  to="#"
                  className={
                    activeMenu.includes("PendingApproval")
                      ? `custom-link nav-link`
                      : `nav-link`
                  }
                  onClick={handlePendingApprovalClick}
                >
                  <FontAwesomeIcon className="fontIcon" icon={faCircleCheck} />
                  <p>
                    Pending Approval
                    {"  "}{" "}
                    <FontAwesomeIcon
                      icon={isPendingApprovalOpen ? faAngleDown : faAngleRight}
                    />
                  </p>
                </Link>
                {isPendingApprovalOpen ? (
                  <ul className="nav">
                    <li className="nav-item">
                      <Link
                        to="/CustomerRequest"
                        className={
                          activeMenu === "/CustomerRequest"
                            ? `custom-link nav-link`
                            : `nav-link`
                        }
                        onClick={() => setActiveMenu("/CustomerRequest")}
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                        {"  "} Customer Requests
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/UserChecker"
                        className={
                          activeMenu === "/UserChecker"
                            ? `custom-link nav-link`
                            : `nav-link`
                        }
                        onClick={() => setActiveMenu("/UserChecker")}
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                        {"  "} User Request
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/RoleRequest"
                        className={
                          activeMenu === "/RoleRequest"
                            ? `custom-link nav-link`
                            : `nav-link`
                        }
                        onClick={() => setActiveMenu("/RoleRequest")}
                      >
                        <FontAwesomeIcon icon={faAngleRight} />
                        {"  "} Role Requests
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li> */}
              {/* --------------Dynamic-------------------------- */}
              {(menuData || []).map((x, index) => {
                return (
                  x.check && (
                    <li
                      className={
                        x.subMenu.length !== 0
                          ? `nav-item has-treeview`
                          : `nav-item`
                      }
                    >
                      <Link
                        to={x.url}
                        className={
                          activeMenu === (x.url === "#" ? x.menuName : x.url)
                            ? `custom-link nav-link`
                            : `nav-link`
                        }
                        onClick={() => {
                          setActiveMenu(x.url === "#" ? x.menuName : x.url);
                          handleToggle(x.id);
                        }}
                      >
                        {" "}
                        <div className="navtitle" key={x.id}>
                          <FontAwesomeIcon
                            icon={
                              x.menuName === "Home"
                                ? faHouse
                                : x.menuName === "User Management"
                                ? faUser
                                : x.menuName === "Customer Maintenance"
                                ? faUsers
                                : x.menuName === "Role Management"
                                ? faUserGear
                                : x.menuName === "Report"
                                ? faFile
                                : x.menuName === "Pending Approval"
                                ? faCircleCheck
                                : ""
                            }
                            className="fontIcon"
                          />{" "}
                          <p>
                            {x.menuName}
                            {"   "}
                            {x.subMenu.length !== 0 && (
                              <FontAwesomeIcon
                                icon={
                                  toggleStates[`item_${x.id}`]
                                    ? faAngleDown
                                    : faAngleRight
                                }
                              />
                            )}
                          </p>
                        </div>
                      </Link>
                      {toggleStates[`item_${x.id}`] ? (
                        <ul className="nav" key={x.id}>
                          {(x.subMenu || []).map((z) => {
                            return x.subMenu.length !== 0 && z.check ? (
                              <li className="nav-item">
                                <Link
                                  to={z.url}
                                  className={
                                    activeMenu === z.url
                                      ? `custom-link nav-link`
                                      : `nav-link`
                                  }
                                  onClick={() => setActiveMenu(z.url)}
                                >
                                  <FontAwesomeIcon icon={faAngleRight} />
                                  {"  "} {z.name}
                                </Link>
                              </li>
                            ) : (
                              ""
                            );
                          })}
                        </ul>
                      ) : (
                        ""
                      )}
                    </li>
                  )
                );
              })}
              {/* ----------------------------------------------- */}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
