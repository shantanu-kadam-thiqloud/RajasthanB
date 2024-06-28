import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import sideData from "./CommonComponents/sideBarData";
export default function AddRole() {
  const [isAllCheck, setAllCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [profile, setProfile] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state ? location.state.user.id : ""; //useParams();
  const locationData = location.state ? location.state.user : {};
  //const profile = profiles.find((u) => u.id.toString() === userId);
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
    // group: Yup.string()
    //   .matches(
    //     /^[a-zA-Z0-9\s.,/]*$/,
    //     "Group should not contain special characters"
    //   )
    //   .required("Group is required"),
  });

  const rows = [
    {
      id: "CUST001",
      fullName: "Mohit J Sharma ",
      accNo: "415689001",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST002",
      fullName: "Jhonson L Roy ",
      accNo: "415689002",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST003",
      fullName: "Martin M Starc ",
      accNo: "415689003",
      state: "Maharashtra",
      isActive: false,
    },
    {
      id: "CUST004",
      fullName: "Davin N Gyle ",
      accNo: "415689004",
      state: "Maharashtra",
      isActive: false,
    },
    {
      id: "CUST005",
      fullName: "Ashutosh A Sharma ",
      accNo: "415689005",
      state: "Maharashtra",
      isActive: true,
    },
    {
      id: "CUST006",
      fullName: "Abhishek B Sharma ",
      accNo: "415689006",
      state: "Maharashtra",
      isActive: true,
    },
  ];
  //const user = users.find((u) => u.id.toString() === userId);
  useEffect(() => {
    if (isEdit) {
      // setIsLoading(true);
    }
  }, [isEdit]);
  const [menuData, setMenuData] = useState(sideData[0].data);
  //-----------------------Menu selection--------------------------------------
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
  //----------------------Handle submit----------------------------------------
  const handleSubmit = (values, { resetForm, setSubmitting }, actions) => {
    console.log(values);
    setIsLoading(true);
    if (isEdit) {
      EditRole(values);
    } else {
      AddRole(values);
    }
  };
  //----------------------Add User---------------------------------------------
  function AddRole(values) {}
  //----------------------Edit User--------------------------------------------
  function EditRole(values) {}

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
                          profileName: isEdit ? profileName : "",
                          profileDescription: isEdit ? profileDescription : "",
                          group: isEdit ? groupId : "",
                          isActive: isEdit ? isActive : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values }) => (
                          <Form>
                            <div className="row">
                              <div className="col-md-12">
                                {/* <h2 className="mb-3 mt-3 pageTitle">
                                  {isEdit ? "Edit" : "Add"} Role
                                </h2> */}
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
                                          Role Name
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
                                          Role Description
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
                              </div>
                            </div>
                          </Form>
                        )}
                      </Formik>
                      <hr />
                      {/* -----------------Profile Mapping--------------------------------------------------------- */}
                      <div className="col-md-12">
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
                      </div>
                      {/* -------------------------------------------------------------------------------------- */}
                      <div className="">
                        <div className="col-md-11 mx-5 flex p-2">
                          {/* <div className="row">
                          <div className="col-md-4">Admin</div>
                          <div className="col-md-4">User</div>
                          <div className="col-md-3">ADD</div>
                          <div className="col-md-1">
                            <input
                              name="isActive"
                              className="form-check-input"
                              type="checkbox"
                              checked={true}
                            />
                          </div>
                        </div> */}
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
