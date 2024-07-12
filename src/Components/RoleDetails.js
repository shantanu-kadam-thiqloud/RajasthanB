import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ConvertFormat,
  DateFormatFunction,
} from "./HtmlComponents/CommonFunction";
import sideData from "./CommonComponents/sideBarData";
export default function RoleDetails() {
  const [isLoading, setIsLoading] = useState(false);
  // const [role, setRole] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const path = window.location.pathname;
  const role = location.state ? location.state?.user : ""; //?.role_id
  const isDelete = path.includes("DeleteRole") ? true : false;
  const jsonMenu = JSON.parse(role?.menu_access || "[]");
  const [menuData, setMenuData] = useState(sideData[0].data); //jsonMenu ||
  useEffect(() => {
    // setIsLoading(true);
  }, []);
  if (!role) {
    // return <p>Role not found.</p>;
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
                      <div className="row UserDetails mt-3 makerFields role">
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
                                <td className="col-md-3 UDCoulmns fieldColumn">
                                  <strong>Is Active:</strong>
                                </td>
                                <td className="col-md-3 UDCoulmns fieldColumn">
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
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* -----------------Profile Mapping--------------------------------------------------------- */}
                      <div className="col-md-12">
                        <h1 className="mb-2 mt-2 pageTitle">Menu Mapping</h1>
                      </div>
                      {/* -------------------------------------------------------------------------------------- */}
                      <div className="">
                        <div className="col-md-11 mx-5 flex p-2">
                          {(menuData || []).map((m, mindex) => {
                            return (
                              <div className="col p-1" key={m.id}>
                                <div className="row menuColor">
                                  <div className="col-md-4 ">{m.menuName}</div>
                                  <div className="col-md-4 "></div>
                                  <div className="col-md-3 "></div>
                                  <div className="col-md-1 ">
                                    {m.subMenu.length === 0 && (
                                      <input
                                        readOnly
                                        className="form-check-input"
                                        type="checkbox"
                                        id="menu"
                                        checked={m.check}
                                        onClick={(e) => {
                                          console.log("menu -> ", m);
                                        }}
                                      />
                                    )}
                                  </div>
                                </div>
                                {(m.subMenu || []).map((s, sindex) => {
                                  return (
                                    <>
                                      <div className="row p-1">
                                        <div className="col-md-4 submenuColor"></div>
                                        <div className="col-md-4 submenuColor ">
                                          {s.name}
                                        </div>
                                        <div className="col-md-3 submenuColor"></div>
                                        {s.action.length === 0 ? (
                                          <div
                                            className="col-md-1 submenuColor"
                                            key={s.id}
                                          >
                                            {" "}
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id="submenu"
                                              checked={s.check}
                                              readOnly
                                            />
                                          </div>
                                        ) : (
                                          <div
                                            className="col-md-1 submenuColor"
                                            key={s.id}
                                          ></div>
                                        )}
                                      </div>
                                      {(s.action || []).map((a, aindex) => {
                                        return (
                                          <div className="row p-1" key={a.id}>
                                            <div className="col-md-4 submenuColor"></div>
                                            <div className="col-md-4 submenuColor"></div>
                                            <div className="col-md-3  submenuColor">
                                              {a.actionName}
                                            </div>
                                            <div
                                              className="col-md-1 submenuColor"
                                              key={a.id}
                                            >
                                              {" "}
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="submenu"
                                                checked={a.check}
                                                readOnly
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>

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
  );
}
