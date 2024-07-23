import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [customer, setCustomer] = useState(location.state ? location.state.user : {});
  const [user, setUser] = useState(location.state ? location.state.user : {});
  if (!customer) {
    return <p>Customer not found.</p>;
  }


  //----------------------Get User--------------------------------------------
  function fetchUserById() {}
  //----------------------Delete User-----------------------------------------
  // const customer = {
  //   customerId: "CUST001",
  //   customerName: "John Doe",
  //   customerAccountNo: "123456789",
  //   confirmAccountNumber: "123456789",
  //   isAccountValid: true,
  //   invalidReason: "N/A",
  //   validateDate: "2024-05-31",
  //   ifscCode: "ABC123",
  //   emailId: "john@example.com",
  //   mobileNo: "1234567890",
  //   clientId: "CLIENT001",
  //   clientSecret: "SECRET123",
  //   merchantName: "ABC Merchants",
  //   state: "California",
  //   schemeName: "Basic Scheme",
  //   description: "Basic description",
  //   isActive: true,
  //   createdBy: "Admin",
  //   createdDate: "2024-05-31",
  //   lastModifiedBy: "Admin",
  //   lastModifiedDate: "2024-05-31",
  // };

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
                            Customer Details
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row UserDetails mt-3 makerFields">                        
                        <div className="col-md-12 p-0">
                        <table className="table customerDetails">
                          <tbody>
                            <tr>                              
                              <td className="col-md-3 UDCoulmns">
                                <strong>Account Name:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">{customer.customer_name}</td>
                              <td className="col-md-3 UDCoulmns">
                                <strong>Account No:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">{customer.customer_account_no}</td>
                            </tr>
                            <tr>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>State:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">{customer.state}</td>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>IFSC Code:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">{customer.ifsc_code}</td>
                            </tr>
                            <tr>                              
                              <td className="col-md-3 UDCoulmns">
                                <strong>E-collection Merchant ID:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">{customer.merchant_name}</td>
                              <td className="col-md-3 UDCoulmns">
                                <strong>Client ID:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">{customer.client_id}</td>
                            </tr>
                            <tr>                              
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>Secret Key:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">{customer.client_secret}</td>
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>Email ID:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">{customer.email_id}</td>
                            </tr>
                            <tr>                             
                              <td className="col-md-3 UDCoulmns">
                                <strong>Mobile No:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns">{customer.mobile_no}</td>
                              <td className="col-md-3 UDCoulmns">
                                <strong>Remarks:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns ">{customer.description}</td>
                            </tr>
                            {/* <tr>                             
                              <td className="col-md-3 UDCoulmns fieldColumn">
                                <strong>Is Active:</strong>
                              </td>
                              <td className="col-md-3 UDCoulmns fieldColumn">{customer.is_active ? "Yes" : "No"}</td>
                            </tr>                             */}
                          </tbody>
                        </table>
                      <div class="col-md-12">
                       <div className="modal-footer">
                       <button
                          className="btn BackBtn mr-2"
                          type="button"
                          onClick={() => {
                            navigate(`/Customers`)}}
                        >
                          Back to List
                        </button>
                        <button
                          className="btn addUser"
                          type="button"
                          onClick={() => {                           
                              navigate(`/EditCustomer`, {
                                state: { user },
                              });                           
                          }}
                        > Edit                          
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
      </div>
    </div>
  );
}
