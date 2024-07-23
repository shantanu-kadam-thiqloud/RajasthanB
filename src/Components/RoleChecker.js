import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faRotateLeft,
  faThumbsDown,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Spinner from "./HtmlComponents/Spinner";
import { sideData, unCheckSideData } from "./CommonComponents/sideBarData";
import { saveData } from "../Services/API-services";
import { getSessionStorage } from "./CommonComponents/cookieData";

const RoleChecker = () => {
  const path = window.location.pathname;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [remark, setRemark] = useState("");
  const navigate = useNavigate();
  const [reqDate, setReqDate] = useState("");
  const [reqTime, setReqTime] = useState("");
  const USER = getSessionStorage("USER");
  const [requestData, setRequestData] = useState(
    location?.state?.requestData || {}
  );
  //const [requestTableData, setRequestTableData] = useState(requestData1)
  const [updatedValue, setUpdatedValue] = useState(
    requestData?.updatedValue || {}
  );
  const [oldValue, setOldValue] = useState(requestData?.existing_values || {});
  const jsonMenu = JSON.parse(requestData?.updatedValue?.menu_access || "[]"); //
  const [menuData, setMenuData] = useState(
    jsonMenu.length !== 0 ? jsonMenu : unCheckSideData[0].data
  );
  const getDateTime = (datestring) => {
    const dateTime = new Date(datestring);

    // Extract date components
    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = dateTime.getDate();

    // Extract time components
    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();
    const second = dateTime.getSeconds();

    setReqDate(`${year}-${month}-${day}`);
    setReqTime(`${hour}:${minute}:${second}`);
  };
  useEffect(() => {
    if (requestData && requestData?.makerTimestamp) {
      getDateTime(requestData?.makerTimestamp);
    }
  }, [requestData]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "40%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  function CheckerApproval(action) {
    setIsLoading(true);
    // const requestBody = {
    //   utilityType: "Role",
    //   makerId: requestData?.makerId,
    //   requestType: requestData?.requestType,
    //   tableName: "mst_sb_roles",
    //   updatedValue: requestData?.updatedValue,
    //   description: remark, //requestData?.description, //"Creating a new Role",
    //   status: action,
    //   created_by: requestData?.existing_values?.created_by, //"makerName",
    //   checkerId: USER?.userId, //1,
    //   lastModifiedBy: requestData?.existing_values?.last_modified_by, //"1", //requestData.makerId,
    //   existing_values: requestData?.existing_values,
    //   masterId: requestData?.masterId,
    // };
    const data = {
      status: action,
      checkerId: USER?.userId,
      checker_remark: remark,
    };
    const requestBody = { ...requestData, ...data };
    const baseUrl = process.env.REACT_APP_API_URL;
    saveData(
      requestBody,
      `${baseUrl}/checheraction`,
      (res) => {
        if (res.status === 200) {
          setIsLoading(false);
          toast.success(`Request ${action} successfully!`, {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/RoleRequest");
          }, 1000);
        }
      },
      (error) => {
        setIsLoading(false);
        console.error("Error->", error);
        toast.error(error, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    );
  }

  const formatFieldLabel = (field) => {
    return field
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div>
      <div className="content-wrapper ">
        <div className="content-header">
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12 ">
                  <div className="card">
                    <div className="card-header">
                      <div className="row alignCenter">
                        <div className="col-sm-10">
                          <h1 className="m-0 pageTitle">Request Details</h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row UserDetails mt-3">
                        <div className="col-md-12 mx-auto">
                          <div className="row text-start">
                            <div className="col-md-6 mx-auto">
                              <table className="table checkerDetails">
                                <tbody>
                                  <tr>
                                    <td className="col-md-6 UDCoulmns fieldColumn">
                                      <strong>Request Id:</strong>
                                    </td>
                                    <td className="col-md-6 UDCoulmns">
                                      {requestData?.requestId}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="col-md-6 UDCoulmns fieldColumn">
                                      <strong>Maker ID:</strong>
                                    </td>
                                    <td className="col-md-6 UDCoulmns">
                                      {requestData?.makerId}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="col-md-6 UDCoulmns fieldColumn">
                                      <strong>Request Type:</strong>
                                    </td>
                                    <td className="col-md-6 UDCoulmns">
                                      {requestData?.requestType}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="col-md-6">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td className="col-md-6 UDCoulmns fieldColumn">
                                      <strong>Request Date:</strong>
                                    </td>
                                    <td className="col-md-6 UDCoulmns">
                                      {/* {new Date(requestData.makerTimestamp).toLocaleDateString()} */}
                                      {reqDate}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="col-md-6 UDCoulmns fieldColumn">
                                      <strong>Request Time:</strong>
                                    </td>
                                    <td className="col-md-6 UDCoulmns">
                                      {/* {new Date(requestData.makerTimestamp).toLocaleDateString()} */}
                                      {reqTime}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="row mt-4 makerFields role">
                            <div className="col-md-12 p-0">
                              <table className="table">
                                <thead>
                                  <tr className="">
                                    <th className="col-md-4 UDCoulmns">
                                      Field Name
                                    </th>
                                    <th className="col-md-4 UDCoulmns">
                                      Updated Value
                                    </th>
                                    <th className="col-md-4 UDCoulmns">
                                      Old Value
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="col-md-4 UDCoulmns fieldColumn">
                                      <strong>Role Name:</strong>
                                    </td>
                                    <td className="col-md-4 UDCoulmns">
                                      {updatedValue?.role_name}
                                    </td>
                                    <td className="col-md-4 UDCoulmns">
                                      {oldValue?.role_name ||
                                        oldValue?.roleName}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="col-md-4 UDCoulmns fieldColumn">
                                      <strong>Role Description:</strong>
                                    </td>
                                    <td className="col-md-4 UDCoulmns">
                                      {updatedValue?.role_description}
                                    </td>
                                    <td className="col-md-4 UDCoulmns">
                                      {oldValue?.role_description ||
                                        oldValue?.roleDescription}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <hr />
                          {/* -----------------Profile Mapping--------------------------------------------------------- */}
                          <div className="col-md-12">
                            <h1 className="mb-2 mt-2 pageTitle">
                              Menu Mapping
                            </h1>
                          </div>
                          {/* -------------------------------------------------------------------------------------- */}
                          <div className="">
                            <div className="col-md-11 mx-5 flex p-2">
                              <div className="col p-1">
                                <div className="row menuColor ">
                                  <div className="col-md-9"></div>
                                  <div className="col-md-3">
                                    <span className="ml40">Updated</span>
                                    <span className="ml40">Old</span>
                                  </div>
                                </div>
                              </div>
                              {(menuData || []).map((m, mindex) => {
                                return (
                                  <div className="col p-1" key={m.id}>
                                    <div className="row menuColor">
                                      <div className="col-md-4 ">
                                        {m.menuName}
                                      </div>
                                      <div className="col-md-4 "></div>
                                      <div className="col-md-2 "></div>
                                      <div className="col-md-1">
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
                                      <div className="col-md-1">
                                        {m.subMenu.length === 0 && (
                                          <input
                                            readOnly
                                            className="form-check-input"
                                            type="checkbox"
                                            id="menu"
                                            checked={m.oldCheck}
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
                                            <div className="col-md-2 submenuColor"></div>
                                            {s.action.length === 0 ? (
                                              <>
                                                {" "}
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
                                                <div
                                                  className="col-md-1 submenuColor"
                                                  key={s.id}
                                                >
                                                  {" "}
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="submenu"
                                                    checked={s.oldCheck}
                                                    readOnly
                                                  />
                                                </div>
                                              </>
                                            ) : (
                                              <div
                                                className="col-md-2 submenuColor"
                                                key={s.id}
                                              ></div>
                                            )}
                                          </div>
                                          {(s.action || []).map((a, aindex) => {
                                            return (
                                              <div
                                                className="row p-1"
                                                key={a.id}
                                              >
                                                <div className="col-md-4 submenuColor"></div>
                                                <div className="col-md-4 submenuColor"></div>
                                                <div className="col-md-2 submenuColor">
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
                                                <div
                                                  className="col-md-1 submenuColor"
                                                  key={a.id}
                                                >
                                                  {" "}
                                                  <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="submenu"
                                                    checked={a.oldCheck}
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

                          <div className="row mb-5">
                            <div className="col-md-12">
                              <div className="modal-footer">
                                <button
                                  className="btn BackBtn me-2"
                                  type="submit"
                                  onClick={() => navigate("/RoleRequest")}
                                >
                                  <FontAwesomeIcon
                                    icon={faRotateLeft}
                                    className="whiteIcon"
                                  />
                                  Back to List
                                </button>
                                <button
                                  className="btn addUser declineBtn"
                                  type="button"
                                  onClick={openModal}
                                >
                                  <FontAwesomeIcon
                                    icon={faThumbsDown}
                                    className="plusIcon"
                                  />
                                  Decline Request
                                </button>
                                <button
                                  className="btn addUser"
                                  type="button"
                                  onClick={() => {
                                    setIsLoading(true);
                                    CheckerApproval("Approved");
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="plusIcon"
                                  />
                                  Approve Request
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

              {/* ----------Decline Pop------------------- */}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div>
                  <div className="float-end mt-2">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="closeIconPopup"
                      onClick={closeModal}
                    />
                  </div>
                  <h3 className="text-left">
                    Please add Request decline reason
                  </h3>
                  <div className="">
                    <textarea
                      rows="4"
                      name="remark"
                      className="form-control"
                      placeholder="Enter your remark here"
                      onChange={(e) => {
                        setRemark(e.target.value);
                      }}
                    />
                    <div className="p-2"></div>
                    <div className="text-center">
                      <button
                        className="btn addUser checkerAction mr-3 declineBtn"
                        type="button"
                        onClick={() => {
                          setIsLoading(true);
                          CheckerApproval("Declined");
                        }}
                      >
                        Decline
                      </button>
                      <button
                        className="btn addUser checkerAction"
                        type="button"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleChecker;
