import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { saveData } from "./../Services/API-services";
import { toast } from "react-toastify";

export default function AddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const customerid = location.state ? location.state.user.customer_id  : "";
  const [customer, setCustomer] = useState(location.state ? location.state.user : {});
  const [existingValue, setExistingValue] = useState(location.state ? location.state.user : {});
  // const [customer, setCustomer] = useState({});
  const path = window.location.pathname;
  const isEdit = path.includes("EditCustomer");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    customer_name: Yup.string().max(255, "Must be 255 characters or less").required("Account Name is required"),
    customer_account_no: Yup.string()
    .matches(/^[0-9]+$/, "Account Number must be numeric")
    .max(50, "Must be 50 characters or less")
    .required("Account No is required"),
  confirm_account_number: Yup.string()
    .oneOf([Yup.ref('customer_account_no'), null], 'Account numbers must match')
    .matches(/^[0-9]+$/, "Account Number must be numeric")
    .required("Confirm Account Number is required"),
    ifsc_code: Yup.string()
    .matches(/^[a-zA-Z0-9]{11}$/, "IFSC Code must be 11 characters long and alphanumeric")
    .required("IFSC Code is required"),
    email_id: Yup.string().email("Invalid email address").max(255, "Must be 255 characters or less"),
    mobile_no: Yup.string().matches(/^[0-9]{10}$/, "Invalid Mobile No"),
    client_id: Yup.string().max(255, "Must be 255 characters or less").required("Client ID is required"),
    client_secret: Yup.string().max(255, "Must be 255 characters or less").required("Secret Key is required"),
    merchant_name: Yup.string().max(100, "Must be 100 characters or less").required("E-collection Merchant ID is required"),
  });

  const initialValues={
    customer_name: isEdit ? customer.customer_name : "",
    customer_account_no: isEdit ? customer.customer_account_no : "",
    confirm_account_number: isEdit ? customer.confirm_account_number : "",                       
    ifsc_code: isEdit ? customer.ifsc_code : "",
    email_id: isEdit ? customer.email_id : "",
    mobile_no: isEdit ? customer.mobile_no : "",
    client_id: isEdit ? customer.client_id : "",
    client_secret: isEdit ? customer.client_secret : "",
    merchant_name: isEdit ? customer.merchant_name : "",
    description: isEdit ? customer.description : "",
    is_active: isEdit ? customer.is_active : 0,
  }

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      // Fetch customer data by ID and populate form fields
      // setCustomer(data);
      setIsLoading(false);
    }
  }, [isEdit]);

  useEffect(() => {
    const preventPaste = (event) => {
      event.preventDefault();
      return false;
    };

    const accountNoField = document.getElementById('customer_account_no');
    const confirmAccountNoField = document.getElementById('confirm_account_number');

    if (accountNoField) {
      accountNoField.onpaste = preventPaste;
    }

    if (confirmAccountNoField) {
      confirmAccountNoField.onpaste = preventPaste;
    }

    // Cleanup function to remove event listeners
    return () => {
      if (accountNoField) {
        accountNoField.onpaste = null;
      }

      if (confirmAccountNoField) {
        confirmAccountNoField.onpaste = null;
      }
    };
  }, []);

  const handleSubmit = (values) => {
    setIsLoading(true);
    addCustomer(values);
  };

  function addCustomer(values) {
    values.is_active = (!isEdit) ? 1 : values.is_active;
    const data = {
      utilityType: "Customer",
      makerId: "1",
      user_id: customerid,
      requestType: isEdit ? "update" : "add",
      tableName: "mst_customer",
      updatedValue: values,
     // requestData: requestData,
      existing_values: existingValue,
      description: isEdit ? "Update Customer" : "Creating a new Customer",
      createdBy: "Admin",
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    saveData(data, `${baseUrl}/makerRequest`, (response) => {
      if (response.data) {
        showCustomToast(
          response.data.message + " Your Request Id is " + response.data.requestId,
          response.data.requestId
        );
      }
    });
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
                          <h1 className="m-0 pageTitle">{isEdit ? "Edit" : "Add"} Customer</h1>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          handleSubmit(values);
                          setSubmitting(false);
                          resetForm({ values: initialValues });
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="customer_name" className="form-label required">Account Name <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="customer_name" name="customer_name" placeholder="Enter customer name" maxLength="255" />
                                    <ErrorMessage name="customer_name" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="customer_account_no" className="form-label required">Account Number <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="customer_account_no" name="customer_account_no" placeholder="Enter account number" maxLength="50"  disabled={isEdit} />
                                    <ErrorMessage name="customer_account_no" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="confirm_account_number" className="form-label required">Confirm Account Number <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="confirm_account_number" name="confirm_account_number" placeholder="Confirm account number" maxLength="50"  disabled={isEdit} />
                                    <ErrorMessage name="confirm_account_number" component="div" className="error" />
                                  </div>
                                </div>                              
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="ifsc_code" className="form-label required">IFSC Code <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="ifsc_code" name="ifsc_code" placeholder="Enter IFSC code" maxLength="100" />
                                    <ErrorMessage name="ifsc_code" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="merchant_name" className="form-label required">E-collection Merchant ID <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="merchant_name" name="merchant_name" placeholder="Enter merchant name" maxLength="100" />
                                    <ErrorMessage name="merchant_name" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="client_id" className="form-label required">Client ID <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="client_id" name="client_id" placeholder="Enter client ID" maxLength="255" />
                                    <ErrorMessage name="client_id" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="client_secret" className="form-label required">Secret Key <span className="Fieldrequired">*</span></label>
                                    <Field type="text" className="form-control" id="client_secret" name="client_secret" placeholder="Enter client secret" maxLength="255" />
                                    <ErrorMessage name="client_secret" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="email_id" className="form-label">Email ID</label>
                                    <Field type="text" className="form-control" id="email_id" name="email_id" placeholder="Enter email ID" maxLength="255" />
                                    <ErrorMessage name="email_id" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="mobile_no" className="form-label">Mobile No</label>
                                    <Field type="text" className="form-control" id="mobile_no" name="mobile_no" placeholder="Enter mobile number" maxLength="15" />
                                    <ErrorMessage name="mobile_no" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Remarks</label>
                                    <Field type="text" className="form-control" id="description" name="description" placeholder="Enter description" maxLength="255" />
                                    <ErrorMessage name="description" component="div" className="error" />
                                  </div>
                                </div>
                                {isEdit && (
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="is_active" className="form-label required">Is Active</label>                                 
                                    <Field
                                      as="select"
                                      className="form-control form-select"
                                      id="is_active"
                                      name="is_active"
                                      onChange={(e) => setFieldValue("is_active", parseInt(e.target.value, 10))}
                                    >
                                      <option value="" className="greyText">Select status</option>
                                      <option value="1">Active</option>
                                      <option value="2">Inactive</option>
                                    </Field>
                                  </div>
                                </div>
                                )}
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn BackBtn" onClick={() => navigate(-1)}>Back to List</button>
                              <button type="submit" className="btn addUser">Submit</button>
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
