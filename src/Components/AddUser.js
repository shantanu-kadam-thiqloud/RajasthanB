import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { saveData } from "./../Services/API-services";
import { toast } from "react-toastify";

export default function AddUser() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const userId = location.state ? location.state.user.user_id : "";
  const [user, setUser] = useState(location.state ? location.state.user : {});
  const [existingValue, setExistingValue] = useState(location.state ? location.state.user : {});
  const [profileList, setProfileList] = useState([]);
  const navigate = useNavigate();
  const phoneRegExp = /^\d{10}$/;
  const [pageTitle, setPageTitle] = useState("Add User");

  const validationSchema = Yup.object({
    first_name: Yup.string()
      .matches(
        /^[a-zA-Z\s]*$/,
        "First Name should not contain special characters"
      )
      .required("First Name is required"),
    last_name: Yup.string()
      .matches(
        /^[a-zA-Z\s]*$/,
        "Last Name should not contain special characters"
      )
      .required("Last Name is required"),
    email_id: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    role_id: Yup.number()
      .required("Role is required"),
    contact_no: Yup.string()
      .matches(phoneRegExp, "Contact number is not valid"),
    user_name: Yup.string()
      .required("Username is required"),
  });

  const isEdit = Boolean(userId);

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      setPageTitle("Edit User")
      // Fetch user details logic
      // Assume we have a function fetchUserDetails to get user details by ID
      // fetchUserDetails(userId).then(data => {
      //   setUser(data);
      //   setIsLoading(false);
      // });
    }
  }, [isEdit, userId]);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setIsLoading(true);
    AddUser(values);
    // if (isEdit) {
    //   EditUser(values);
    // } else {
    //   AddUser(values);
    // }
  };

  const  AddUser = async (values) => {
    values.is_active = (values.is_active === true || values.is_active === 1) ? 1 : 0;
    const requestData = await createRequestData(existingValue, values);
    const data = {
      utilityType: "user",
      makerId: "1",
      user_id: userId,
      requestType: isEdit ? "update" : "add",
      tableName: "txn_sb_users",
      updatedValue: values,
      requestData: requestData,
      existing_values: existingValue,
      description: isEdit ? "Update user" : "Creating a new user",
      createdBy: "Admin",
    };
    const baseUrl = "http://172.16.16.113:8080/kmbl-rsbcl-api";
    saveData(data, `${baseUrl}/makerRequest`, (response) => {
      if (response.data) {
        showCustomToast(
          response.data.message + ". Your Request Id is " + response.data.requestId,
          response.data.requestId
        );
      }
    });
  };

  async function createRequestData(oldValue, updatedValue) {
    const keys = Object.keys(updatedValue);
    const requestData = keys.map(key => {
      return {
        field: key,
        existingValue: oldValue[key],
        newValue: updatedValue[key]
      };
    });
    return requestData;
  }
  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Request ID copied to clipboard", {
        position: "top-right",
        autoClose: false,
      });
    });
  };

  const CustomToast = ({ closeToast, requestData, requestId }) => (
    <div>
      <div>{requestData}</div><br />
      <button className="btn BackBtn mr-3" onClick={() => copyToClipboard(requestId)}>
        Copy ID
      </button>
      <button className="btn addUser" onClick={() => closeToast()}>OK</button>
    </div>
  );

  const showCustomToast = (response, requestId) => {
    toast.success(<CustomToast requestData={response} requestId={requestId} />, {
      position: "top-center",
      autoClose: false,
      className: "custom-toast",
    });
  };

  return (
    <div>
      <div className="content-wrapper">
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
                           {pageTitle}                            
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Formik
                        initialValues={{
                          first_name: isEdit ? user.first_name : "",
                          last_name: isEdit ? user.last_name : "",
                          email_id: isEdit ? user.email_id : "",
                          contact_no: isEdit ? user.contact_no : "",
                          user_name: isEdit ? user.user_name : "",
                          role_id: isEdit ? user.role_id : "",
                          is_active: isEdit ? user.is_active : false,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div className="modal-body mb-3">
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label required">
                                      First Name
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="first_name"
                                      name="first_name"
                                      placeholder="Enter first name"
                                      maxLength="100"
                                    />
                                    <ErrorMessage name="first_name" component="div" className="error" />
                                  </div>

                                  <div className="mb-3">
                                    <label htmlFor="email_id" className="form-label required">
                                      Email
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="email_id"
                                      name="email_id"
                                      placeholder="Enter email"
                                      maxLength="50"
                                    />
                                    <ErrorMessage name="email_id" component="div" className="error" />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <label htmlFor="user_name" className="form-label required">
                                      Username
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="user_name"
                                      name="user_name"
                                      placeholder="Enter username"
                                      maxLength="100"
                                    />
                                    <ErrorMessage name="user_name" component="div" className="error" />
                                  </div>

                                    <div className="mb-3">
                                      <label htmlFor="is_active" className="form-label">
                                        Is Active
                                      </label>
                                      <br />
                                      <Field
                                        name="is_active"
                                        className="form-check-input checkbox-custom"
                                        type="checkbox"
                                        id="flexSwitchCheckChecked"
                                      />
                                    </div>                                  
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label required">
                                      Last Name
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="last_name"
                                      name="last_name"
                                      placeholder="Enter last name"
                                      maxLength="100"
                                    />
                                    <ErrorMessage name="last_name" component="div" className="error" />
                                  </div>

                                  <div className="mb-3">
                                    <label htmlFor="contact_no" className="form-label">
                                      Contact Number
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="contact_no"
                                      name="contact_no"
                                      placeholder="Enter contact number"
                                      maxLength="10"
                                    />
                                    <ErrorMessage name="contact_no" component="div" className="error" />
                                  </div>

                                  <div className="mb-3">
                                    <label htmlFor="role_id" className="form-label required">
                                      Role
                                    </label>
                                    <Field
                                      as="select"
                                      className="form-control form-select"
                                      id="role_id"
                                      name="role_id"
                                      onChange={(e) => setFieldValue("role_id",parseInt(e.target.value, 10))}
                                    >
                                      <option value="" className="greyText">Select role</option>
                                      <option value="1">Checker</option>
                                      <option value="2">Maker</option>
                                      <option value="3">Admin</option>
                                      <option value="4">Operation Checker</option>
                                    </Field>
                                    <ErrorMessage name="role_id" component="div" className="error" />
                                  </div>                                  
                                </div>
                              </div>
                            </div>

                            <div className="modal-footer">
                              <button
                                className="btn BackBtn me-2"
                                type="button"
                                onClick={() => navigate("/User")}
                              >
                                Back to List
                              </button>
                              <button
                                className="btn addUser min me-2"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
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
