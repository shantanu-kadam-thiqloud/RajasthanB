import React, { useState } from "react";
import LOGO from "../../Assets/img/kotak-mahindra-bank-logo.png";
import { faHouse, faFile, faCircleCheck, faUser, faUsers, faUserGear, faBars, faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(window.location.pathname);
  const [isPendingApprovalOpen, setIsPendingApprovalOpen] = useState(false);
  const handlePendingApprovalClick = () => {
    setIsPendingApprovalOpen(!isPendingApprovalOpen);
    setActiveMenu("/PendingApproval");
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
              <li className="nav-item">
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
              {/* <li className="nav-item">
                <Link
                  to="/Menus"
                  className={
                    activeMenu === "/Menus" ? `custom-link nav-link` : `nav-link`
                  }
                  onClick={() => {
                    setActiveMenu("/Menus");
                  }}
                >
                  <FontAwesomeIcon
                    className="fontIcon"
                    icon={faBars}
                    onClick={() => {}}
                  />
                  <p>Menu Management</p>
                </Link>
              </li> */}
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
                  className={activeMenu.includes("PendingApproval") ? `custom-link nav-link` : `nav-link`}
                  onClick={handlePendingApprovalClick}
                  >
                    <FontAwesomeIcon className="fontIcon" icon={faCircleCheck} />
                    <p>
                      Pending Approval
                      {"  "} <FontAwesomeIcon icon={isPendingApprovalOpen ? faAngleDown : faAngleRight} />
                    </p>
                </Link>
                {isPendingApprovalOpen ? (               
                <ul className="nav">
                  <li className="nav-item">
                    <Link
                      to="/CustomerRequest"
                      className={activeMenu === "/CustomerRequest" ? `custom-link nav-link` : `nav-link`}
                      onClick={() => setActiveMenu("/CustomerRequest")}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                      {"  "} Customer Requests
                     
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/UserChecker"
                      className={activeMenu === "/UserChecker" ? `custom-link nav-link` : `nav-link`}
                      onClick={() => setActiveMenu("/UserChecker")}
                    >
                     <FontAwesomeIcon icon={faAngleRight} />
                       {"  "} User Request
                    </Link>
                  </li>
                </ul>
                ): (
                  ""
                )} 
              </li>              
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}
