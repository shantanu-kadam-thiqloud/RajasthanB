import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // const user = users.find((u) => u.id.toString() === userId);
  const path = window.location.pathname;
  const userId = location.state ? location.state.user.id : ""; //useParams();
  const locationData = location.state ? location.state.user : {};
  const isDelete = path.includes("DeleteUser") ? true : false;

  useEffect(() => {
    // setIsLoading(true);
    // fetchUserById();
  }, []);

  if (!user) {
    return <p>User not found.</p>;
  }

  const deleteCustomer = () => {
    // Delete customer API call
    // Example API call:
    // fetch(`/api/customers/${customerId}`, { method: 'DELETE' })
    //   .then(() => {
    //     navigate('/Customer');
    //   });
  };

  //----------------------Get User--------------------------------------------
  function fetchUserById() {}
  //----------------------Delete User-----------------------------------------
  function DeleteUser() {}

  const customer = {
    customerId: "CUST001",
    customerName: "John Doe",
    customerAccountNo: "123456789",
    confirmAccountNumber: "123456789",
    isAccountValid: true,
    invalidReason: "N/A",
    validateDate: "2024-05-31",
    ifscCode: "ABC123",
    emailId: "john@example.com",
    mobileNo: "1234567890",
    clientId: "CLIENT001",
    clientSecret: "SECRET123",
    merchantName: "ABC Merchants",
    state: "California",
    schemeName: "Basic Scheme",
    description: "Basic description",
    isActive: true,
    createdBy: "Admin",
    createdDate: "2024-05-31",
    lastModifiedBy: "Admin",
    lastModifiedDate: "2024-05-31",
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
                            {isDelete ? "Delete User" : "User Details"}
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row UserDetails mt-3">
                        {isDelete ? (
                          <h4 className="col-md-12 mb-5 mx-5">
                            Are you sure you want to delete this?
                          </h4>
                        ) : null}
                        <div className="col-md-12 mx-auto">
                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Customer ID :</strong>
                            {customer.customerId}
                        </div>

                        <div className="col-md-6 UDCoulmns">
                            <strong>Customer Name :</strong>
                            {customer.customerName}
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Customer Account No :</strong>
                            {customer.customerAccountNo}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Confirm Account Number :</strong>
                            {customer.confirmAccountNumber}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Is Account Valid :</strong>
                            {customer.isAccountValid ? "Yes" : "No"}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Invalid Reason :</strong>
                            {customer.invalidReason}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Validate Date :</strong>
                            {customer.validateDate}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>IFSC Code :</strong>
                            {customer.ifscCode}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Email ID :</strong>
                            {customer.emailId}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Mobile No :</strong>
                            {customer.mobileNo}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Client ID :</strong>
                            {customer.clientId}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Client Secret :</strong>
                            {customer.clientSecret}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Merchant Name :</strong>
                            {customer.merchantName}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>State :</strong>
                            {customer.state}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Scheme Name :</strong>
                            {customer.schemeName}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Description :</strong>
                            {customer.description}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Is Active :</strong>
                            {customer.isActive ? "Yes" : "No"}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Created By :</strong>
                            {customer.createdBy}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Created Date :</strong>
                            {customer.createdDate}
                        </div>
                        <div className="col-md-6 UDCoulmns">
                            <strong>Last Modified By :</strong>
                            {customer.lastModifiedBy}
                        </div>
                        </div>

                        <div className="row">
                        <div className="col-md-6 UDCoulmns">
                            <strong>Last Modified Date :</strong>
                            {customer.lastModifiedDate}
                        </div>
                        </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row float-right">
                        <button
                          className="btn BackBtn"
                          type="button"
                          onClick={() => {
                            navigate("/Customers");
                          }}
                        >
                          Back to List
                        </button>

                        <button
                          className="btn addUser"
                          type="button"
                          onClick={() => {
                            if (isDelete) {
                              deleteCustomer();
                            } else {
                              navigate(`/EditCustomer`, {
                                state: { customer },
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
  );
}
