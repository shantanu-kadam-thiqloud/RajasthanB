import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({});
  const path = window.location.pathname;
  const isEdit = path.includes("EditCustomer");
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    customerName: Yup.string().max(255, "Must be 255 characters or less").required("Customer Name is required"),
    customerAccountNo: Yup.string().max(50, "Must be 50 characters or less").required("Customer Account No is required"),
    confirmAccountNumber: Yup.string().oneOf([Yup.ref('customerAccountNo'), null], 'Account numbers must match').required("Confirm Account Number is required"),
    isAccountValid: Yup.number().oneOf([0, 1], "Must be 0 or 1"),
    invalidReason: Yup.string().max(255, "Must be 255 characters or less"),
    validateDate: Yup.date(),
    ifscCode: Yup.string().max(100, "Must be 100 characters or less").required("IFSC Code is required"),
    emailId: Yup.string().email("Invalid email address").max(255, "Must be 255 characters or less"),
    mobileNo: Yup.string().max(15, "Must be 15 characters or less"),
    clientId: Yup.string().max(255, "Must be 255 characters or less").required("Client ID is required"),
    clientSecret: Yup.string().max(255, "Must be 255 characters or less").required("Client Secret is required"),
    merchantName: Yup.string().max(100, "Must be 100 characters or less").required("Merchant Name is required"),
    state: Yup.string().max(100, "Must be 100 characters or less").required("State is required"),
    schemeName: Yup.string().max(255, "Must be 255 characters or less"),
    description: Yup.string().max(255, "Must be 255 characters or less"),
    isActive: Yup.number().oneOf([0, 1], "Must be 0 or 1").required("Is Active is required"),
  });

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      // Fetch customer data by ID and populate form fields
      // setCustomer(data);
      setIsLoading(false);
    }
  }, [isEdit]);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setIsLoading(true);
    if (isEdit) {
      editCustomer(values);
    } else {
      addCustomer(values);
    }
  };

  function addCustomer(values) {
    // Add customer API call
  }

  function editCustomer(values) {
    // Edit customer API call
  }

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
                        initialValues={{
                          customerName: isEdit ? customer.customerName : "",
                          customerAccountNo: isEdit ? customer.customerAccountNo : "",
                          confirmAccountNumber: isEdit ? customer.confirmAccountNumber : "",
                          isAccountValid: isEdit ? customer.isAccountValid : 0,
                          invalidReason: isEdit ? customer.invalidReason : "",
                          validateDate: isEdit ? customer.validateDate : "",
                          ifscCode: isEdit ? customer.ifscCode : "",
                          emailId: isEdit ? customer.emailId : "",
                          mobileNo: isEdit ? customer.mobileNo : "",
                          clientId: isEdit ? customer.clientId : "",
                          clientSecret: isEdit ? customer.clientSecret : "",
                          merchantName: isEdit ? customer.merchantName : "",
                          state: isEdit ? customer.state : "",
                          schemeName: isEdit ? customer.schemeName : "",
                          description: isEdit ? customer.description : "",
                          isActive: isEdit ? customer.isActive : 0,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="customerName" className="form-label required">Customer Name</label>
                                    <Field type="text" className="form-control" id="customerName" name="customerName" placeholder="Enter customer name" maxLength="255" />
                                    <ErrorMessage name="customerName" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="customerAccountNo" className="form-label required">Customer Account No</label>
                                    <Field type="text" className="form-control" id="customerAccountNo" name="customerAccountNo" placeholder="Enter account number" maxLength="50" />
                                    <ErrorMessage name="customerAccountNo" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="confirmAccountNumber" className="form-label required">Confirm Account Number</label>
                                    <Field type="text" className="form-control" id="confirmAccountNumber" name="confirmAccountNumber" placeholder="Confirm account number" maxLength="50" />
                                    <ErrorMessage name="confirmAccountNumber" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="isAccountValid" className="form-label">Is Account Valid</label>
                                    <Field type="number" className="form-control" id="isAccountValid" name="isAccountValid" />
                                    <ErrorMessage name="isAccountValid" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="invalidReason" className="form-label">Invalid Reason</label>
                                    <Field type="text" className="form-control" id="invalidReason" name="invalidReason" placeholder="Enter reason for invalidity" maxLength="255" />
                                    <ErrorMessage name="invalidReason" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="validateDate" className="form-label">Validate Date</label>
                                    <Field type="datetime-local" className="form-control" id="validateDate" name="validateDate" />
                                    <ErrorMessage name="validateDate" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="ifscCode" className="form-label required">IFSC Code</label>
                                    <Field type="text" className="form-control" id="ifscCode" name="ifscCode" placeholder="Enter IFSC code" maxLength="100" />
                                    <ErrorMessage name="ifscCode" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="emailId" className="form-label">Email ID</label>
                                    <Field type="text" className="form-control" id="emailId" name="emailId" placeholder="Enter email ID" maxLength="255" />
                                    <ErrorMessage name="emailId" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="mobileNo" className="form-label">Mobile No</label>
                                    <Field type="text" className="form-control" id="mobileNo" name="mobileNo" placeholder="Enter mobile number" maxLength="15" />
                                    <ErrorMessage name="mobileNo" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="clientId" className="form-label required">Client ID</label>
                                    <Field type="text" className="form-control" id="clientId" name="clientId" placeholder="Enter client ID" maxLength="255" />
                                    <ErrorMessage name="clientId" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="clientSecret" className="form-label required">Client Secret</label>
                                    <Field type="text" className="form-control" id="clientSecret" name="clientSecret" placeholder="Enter client secret" maxLength="255" />
                                    <ErrorMessage name="clientSecret" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="merchantName" className="form-label required">Merchant Name</label>
                                    <Field type="text" className="form-control" id="merchantName" name="merchantName" placeholder="Enter merchant name" maxLength="100" />
                                    <ErrorMessage name="merchantName" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="state" className="form-label required">State</label>
                                    <Field type="text" className="form-control" id="state" name="state" placeholder="Enter state" maxLength="100" />
                                    <ErrorMessage name="state" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="schemeName" className="form-label">Scheme Name</label>
                                    <Field type="text" className="form-control" id="schemeName" name="schemeName" placeholder="Enter scheme name" maxLength="255" />
                                    <ErrorMessage name="schemeName" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <Field type="text" className="form-control" id="description" name="description" placeholder="Enter description" maxLength="255" />
                                    <ErrorMessage name="description" component="div" className="error" />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="mb-3">
                                    <label htmlFor="isActive" className="form-label required">Is Active</label>
                                    <Field as="select" className="form-control" id="isActive" name="isActive">
                                      <option value="0">Inactive</option>
                                      <option value="1">Active</option>
                                    </Field>
                                    <ErrorMessage name="isActive" component="div" className="error" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button className="btn BackBtn me-2" type="button" onClick={() => navigate("/Customers")}>
                                Back to List
                              </button>
                              <button className="btn addUser min me-2" type="submit">
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
