import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { unCheckSideData, sideData } from "./CommonComponents/sideBarData";
import { getSessionStorage } from "./CommonComponents/cookieData";
import { saveData } from "../Services/API-services";

export default function AddRole() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const USER = getSessionStorage("USER");
  const role_id = location.state ? location.state.user.role_id : "";
  const [role, setRole] = useState(location.state ? location.state.user : {});
  const [existingValue, setExistingValue] = useState(
    location.state ? location.state.user : {}
  );
  const [menuData, setMenuData] = useState(unCheckSideData[0].data);
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
  useEffect(() => {
    if (isEdit) {
      // setIsLoading(true);
      const jsonMenu = JSON.parse(role?.menu_access || "[]");
      setMenuData(jsonMenu.length !== 0 ? jsonMenu : unCheckSideData[0].data);
    } else {
      handleUnCheckAll();
    }
  }, [isEdit]);
  //-----------------------Menu selection--------------------------------------
  const handleCheckAll = () => {
    const updatedMenuData = menuData.map((menu) => ({
      ...menu,
      check: true,
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
      check: false,
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
  // const handleCheckboxChange = (menuIndex, subMenuIndex, actionIndex) => {
  //   const updatedMenuData = [...menuData];

  //   if (
  //     updatedMenuData[menuIndex] &&
  //     updatedMenuData[menuIndex].subMenu &&
  //     subMenuIndex !== undefined &&
  //     updatedMenuData[menuIndex].subMenu[subMenuIndex]
  //   ) {
  //     // Checkbox in submenu item clicked
  //     const currentSubMenu = updatedMenuData[menuIndex].subMenu[subMenuIndex];
  //     const oldCheckSubMenu = currentSubMenu.check;
  //     currentSubMenu.oldCheck = oldCheckSubMenu; // Store old check value
  //     currentSubMenu.check = !oldCheckSubMenu;
  //   }

  //   if (
  //     actionIndex !== undefined &&
  //     updatedMenuData[menuIndex] &&
  //     updatedMenuData[menuIndex].subMenu &&
  //     subMenuIndex !== undefined &&
  //     updatedMenuData[menuIndex].subMenu[subMenuIndex] &&
  //     updatedMenuData[menuIndex].subMenu[subMenuIndex].action &&
  //     updatedMenuData[menuIndex].subMenu[subMenuIndex].action[actionIndex]
  //   ) {
  //     // Checkbox in action item clicked
  //     const currentAction =
  //       updatedMenuData[menuIndex].subMenu[subMenuIndex].action[actionIndex];
  //     const oldCheckAction = currentAction.check;
  //     currentAction.oldCheck = oldCheckAction; // Store old check value
  //     currentAction.check = !oldCheckAction;
  //   }

  //   setMenuData(updatedMenuData);
  // };

  //----------------------Add Edit Role---------------------------------------------
  const handleCheckboxChange = (menuIndex, subMenuIndex, actionIndex) => {
    const updatedMenuData = [...menuData];

    if (menuIndex !== undefined && updatedMenuData[menuIndex]) {
      // Checkbox in menu item clicked
      const currentMenu = updatedMenuData[menuIndex];
      const oldCheckMenu = currentMenu.check;
      currentMenu.oldCheck = oldCheckMenu; // Store old check value
      currentMenu.check = !oldCheckMenu;
    }

    if (
      subMenuIndex !== undefined &&
      updatedMenuData[menuIndex] &&
      updatedMenuData[menuIndex].subMenu &&
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
  function AddEditRole(values) {
    const stringifyMenu = JSON.stringify(menuData);
    const requestBody = {
      utilityType: "role",
      requestType: isEdit ? "Update" : "Add",
      tableName: "mst_sb_roles",
      description: isEdit ? "Update Role" : "Create a new Role",
      makerId: USER?.userId, //roleId,
      user_id: USER?.userId,
      createdBy: USER?.userName,
      updatedValue: {
        role_name: values?.profileName,
        role_description: values?.profileDescription,
        created_by: USER?.userName,
        menu_access: stringifyMenu, // menuData,
      },
      existing_values: existingValue,
    };
    console.log("Menu access - > ", menuData);
    const baseUrl = process.env.REACT_APP_API_URL;
    if (isEdit) {
      requestBody.columnname = "role_id";
      requestBody.searchvalue = role_id;
      requestBody.updatedValue.last_modified_by = USER?.userName;
    }
    saveData(
      requestBody,
      `${baseUrl}/makerRequest`,
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
      {/* <button
        className="btn BackBtn mr-3"
        onClick={() => copyToClipboard(requestId)}
      >
        Copy ID
      </button> */}
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
                                          maxLength="50"
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
                                          maxLength="100"
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
                            </div>
                          </Form>
                        )}
                      </Formik>
                      {/* -----------------Profile Mapping--------------------------------------------------------- */}
                      <div className="col-md-12">
                        <h1 className="mb-2 mt-2 pageTitle">Menu Mapping</h1>
                        {/* <div className="float-right mb-2 mt-2">
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
                        </div> */}
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
                                        className="form-check-input"
                                        type="checkbox"
                                        id="menu"
                                        checked={m.check}
                                        //checked={s.check || isAllCheck}
                                        onChange={() =>
                                          handleCheckboxChange(mindex)
                                        }
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
