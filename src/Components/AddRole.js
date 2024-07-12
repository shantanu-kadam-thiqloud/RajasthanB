import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import sideData from "./CommonComponents/sideBarData";
import { getSessionStorage } from "./CommonComponents/cookieData";
import { fetchRoles, makeRequest, saveData } from "../Services/API-services";
export default function AddRole() {
  const [isAllCheck, setAllCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [profile, setProfile] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [is_active, setis_active] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const USER = getSessionStorage("USER");
  const role_id = location.state ? location.state.user.role_id : "";
  const [role, setRole] = useState(location.state ? location.state.user : {});
  const [existingValue, setExistingValue] = useState(
    location.state ? location.state.user : {}
  );
  const path = window.location.pathname;
  const isEdit = path.includes("EditRole") ? true : false;
  const validationSchema = Yup.object({
    profileName: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,/]*$/,
        "Profile Name should not contain special characters"
      )
      .required("Role Name is required"),
    profileDescription: Yup.string()
      .matches(
        /^[a-zA-Z0-9\s.,/]*$/,
        "Profile Description should not contain special characters"
      )
      .required("Role Description is required"),
  });

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
  useEffect(() => {
    if (isEdit) {
      // setIsLoading(true);
    }
  }, [isEdit]);
  //-----------------------Menu selection--------------------------------------
  const [menuData, setMenuData] = useState(sideData[0].data);
  const handleCheckAll = () => {
    const updatedMenuData = menuData.map((menu) => ({
      ...menu,
      subMenu: menu.subMenu.map((subMenu) => ({
        ...subMenu,
        check: true,
        action: subMenu.action.map((action) => ({
          ...action,
          oldCheck: action.check, // Store old check value
          check: true,
        })),
      })),
    }));

    setMenuData(updatedMenuData);
  };

  const handleUnCheckAll = () => {
    const updatedMenuData = menuData.map((menu) => ({
      ...menu,
      subMenu: menu.subMenu.map((subMenu) => ({
        ...subMenu,
        check: false,
        action: subMenu.action.map((action) => ({
          ...action,
          oldCheck: action.check, // Store old check value
          check: false,
        })),
      })),
    }));

    setMenuData(updatedMenuData);
  };

  const handleCheckboxChange = (menuIndex, subMenuIndex, actionIndex) => {
    const updatedMenuData = [...menuData];

    if (
      updatedMenuData[menuIndex] &&
      updatedMenuData[menuIndex].subMenu &&
      subMenuIndex !== undefined &&
      updatedMenuData[menuIndex].subMenu[subMenuIndex]
    ) {
      // Checkbox in submenu item clicked
      const currentSubMenu = updatedMenuData[menuIndex].subMenu[subMenuIndex];
      const oldCheckSubMenu = currentSubMenu.check;
      currentSubMenu.oldCheck = oldCheckSubMenu; // Store old check value
      currentSubMenu.check = !oldCheckSubMenu;
    }

    if (
      actionIndex !== undefined &&
      updatedMenuData[menuIndex] &&
      updatedMenuData[menuIndex].subMenu &&
      subMenuIndex !== undefined &&
      updatedMenuData[menuIndex].subMenu[subMenuIndex] &&
      updatedMenuData[menuIndex].subMenu[subMenuIndex].action &&
      updatedMenuData[menuIndex].subMenu[subMenuIndex].action[actionIndex]
    ) {
      // Checkbox in action item clicked
      const currentAction =
        updatedMenuData[menuIndex].subMenu[subMenuIndex].action[actionIndex];
      const oldCheckAction = currentAction.check;
      currentAction.oldCheck = oldCheckAction; // Store old check value
      currentAction.check = !oldCheckAction;
    }

    setMenuData(updatedMenuData);
  };
  //----------------------Add Edit Role---------------------------------------------
  function AddEditRole(values) {
    // values.is_active = (!isEdit) ? 1 : values.is_active;
    const requestBody = {
      utilityType: "Role",
      makerId: USER?.role_id,
      user_id: USER?.userId, //"1",
      requestType: isEdit ? "update" : "add",
      tableName: "mst_sb_roles",
      updatedValue: {
        role_name: values?.profileName, //"John Doe",
        role_description: values?.profileDescription, //"1234567890123456",
      },
      existing_values: existingValue,
      description: isEdit ? "Update Role" : "Creating a new Role",
      created_by: USER?.userName, // "Admin",//
    };
    makeRequest(
      requestBody,
      (response) => {
        if (response.status === 200) {
          showCustomToast(
            response.data.message +
              ". Your Request Id is " +
              response.data.requestId,
            response.data.requestId
          );
          navigate("/Role");
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
    //-------------------------------------------------
    // const requestBody = {
    //   utilityType: "Role",
    //   makerId: USER?.userId, //"1",
    //   user_id: 1,
    //   requestType: isEdit ? "update" : "add",
    //   tableName: "mst_role",
    //   updatedValue: {
    //     role_name: values.profileName, //"John Doe",
    //     role_description: values.profileDescription, //"1234567890123456",
    //   },
    //   existing_values: {
    //     // created_by: "admin",
    //     // created_date: "2024-06-21T09:00:00",
    //     // last_modified_by: "admin",
    //     // last_modified_date: "2024-06-21T09:00:00",
    //   },
    //   description: `${isEdit ? "Update" : "Add"} Role`,
    //   created_by: "Admin",
    // };
    // if (isEdit) {
    //   requestBody.existing_values = {
    //     role_name: role?.role_name,
    //     role_description: role?.role_description,
    //   };
    // }
    // console.log("requestBody Role-> ", requestBody);
    // fetchRoles(
    //   requestBody,
    //   (response) => {
    //     if (response.status === 200) {
    //       toast.success(
    //         `${isEdit ? "Update " : "Add "}request raised successfully.`,
    //         {
    //           position: "top-right",
    //           autoClose: 3000,
    //         }
    //       );
    //     }
    //   },
    //   (error) => {
    //     console.log("Error->", error.message);
    //     toast.error(error.message, {
    //       position: "top-right",
    //       autoClose: 3000,
    //     });
    //   }
    // );
  }
  //----------------------Handle submit----------------------------------------
  const handleSubmit = (values, { resetForm, setSubmitting }, actions) => {
    setIsLoading(true);
    AddEditRole(values);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Request ID copied to clipboard", {
        position: "top-right",
        autoClose: true,
      });
    });
  };

  const CustomToast = ({ closeToast, requestData, requestId }) => (
    <div>
      <div>{requestData}</div>
      <br />
      <button
        className="btn BackBtn mr-3"
        onClick={() => copyToClipboard(requestId)}
      >
        Copy ID
      </button>
      <button className="btn addUser" onClick={() => closeToast()}>
        OK
      </button>
    </div>
  );

  const showCustomToast = (response, requestId) => {
    toast.success(
      <CustomToast requestData={response} requestId={requestId} />,
      {
        position: "top-center",
        autoClose: false,
        className: "custom-toast",
      }
    );
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
                          <h1 className="m-0 pageTitle">
                            {isEdit ? "Edit" : "Add"} Role
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Formik
                        initialValues={{
                          profileName: isEdit ? role?.role_name : "",
                          profileDescription: isEdit
                            ? role?.role_description
                            : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values }) => (
                          <Form>
                            <div className="row">
                              {/* <div className="col-md-12">
                                <div className="float-right">
                                  <button
                                    className="btn BackBtn me-2"
                                    type="submit"
                                    onClick={() => {
                                      navigate("/Role");
                                    }}
                                  >
                                    Back to List
                                  </button>
                                  <button
                                    className="btn addUser min me-2"
                                    type="submit"
                                  >
                                    Submit
                                  </button>
                                  {"  "}
                                </div>
                              </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-11 mx-auto flex">
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="profileName"
                                          className="form-label required"
                                        >
                                          Role Name{" "}
                                          <span className="Fieldrequired">
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          type="text"
                                          className="form-control"
                                          id="profileName"
                                          name="profileName"
                                          placeholder="Enter role name"
                                        />
                                        <ErrorMessage
                                          name="profileName"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                      <div className="mb-3">
                                        <label
                                          htmlFor="profileDescription"
                                          className="form-label required"
                                        >
                                          Role Description{" "}
                                          <span className="Fieldrequired">
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          type="text"
                                          className="form-control"
                                          id="profileDescription"
                                          name="profileDescription"
                                          placeholder="Enter role description"
                                        />
                                        <ErrorMessage
                                          name="profileDescription"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="float-right">
                                    <button
                                      className="btn BackBtn me-2"
                                      type="submit"
                                      onClick={() => {
                                        navigate("/Role");
                                      }}
                                    >
                                      Back to List
                                    </button>
                                    <button
                                      className="btn addUser min me-2"
                                      type="submit"
                                    >
                                      Submit
                                    </button>
                                    {"  "}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* <hr /> */}
                      {/* -----------------Profile Mapping--------------------------------------------------------- */}
                      {/* <div className="col-md-12">
                        <h2 className="mb-2 mt-2 pageTitle">Menu Mapping</h2>
                        <div className="float-right mb-2 mt-2">
                          <button
                            className="btn addUser me-2 min-width-110px"
                            type="button"
                            onClick={() => {
                              // setAllCheck(true);
                              handleCheckAll();
                            }}
                          >
                            Check All
                          </button>{" "}
                          <button
                            className="btn addUser"
                            type="button"
                            onClick={() => {
                              // setAllCheck(false);
                              handleUnCheckAll();
                            }}
                          >
                            UnCheck All
                          </button>{" "}
                        </div>
                      </div> */}
                      {/* -------------------------------------------------------------------------------------- */}
                      {/* <div className="">
                        <div className="col-md-11 mx-5 flex p-2">
                           {(menuData || []).map((m, mindex) => {
                            return (
                              <div className="col p-1" key={m.id}>
                                <div className="row menuColor">
                                  <div className="col ">{m.menuName}</div>
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
                                              //checked={s.check || isAllCheck}
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  mindex,
                                                  sindex
                                                )
                                              }
                                              onClick={(e) => {
                                                console.log("Submenu -> ", s);
                                              }}
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
                                                //  checked={a.check || isAllCheck}
                                                onClick={(e) => {
                                                  console.log(
                                                    "Action -> ",
                                                    s,
                                                    a
                                                  );
                                                }}
                                                onChange={() =>
                                                  handleCheckboxChange(
                                                    mindex,
                                                    sindex,
                                                    aindex
                                                  )
                                                }
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
                      </div> */}
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
