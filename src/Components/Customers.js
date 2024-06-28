import React, { useEffect } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
//import { fetchCustomerList } from "../Services/API-services";

export default function Customers() {
  const navigate = useNavigate();
  const columns = [
    {
      field: "customer_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Customer Name",
    },
    {
      field: "customer_account_no",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Account Number",
    },
    {
      field: "is_account_valid",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Is Account Valid",
    },
    {
      field: "ifsc_code",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "IFSC Code",
    },
    {
      field: "email_id",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Email",
    },
    {
      field: "mobile_no",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Mobile Number",
    },
    {
      field: "state",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "State",
    },
    {
      field: "merchant_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Merchant Name",
    },
    {
      field: "scheme_name",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Scheme Name",
    },
    {
      field: "is_active",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Is Active",
      className: "text-center",
    },
    {
      field: "",
      header: "Action",
      className: "text-center",
      body: "buttonsTemplate",
    },
  ];

  const rows = [
    {
      customer_name: "Mohit Sharma",
      customer_account_no: "1234567890",
      is_account_valid: 1,
      ifsc_code: "HDFC0001234",
      email_id: "mohit@example.com",
      mobile_no: "9876543210",
      state: "Maharashtra",
      merchant_name: "Merchant 1",
      scheme_name: "Scheme A",
      is_active: 1,
    },
    {
      customer_name: "John Doe",
      customer_account_no: "0987654321",
      is_account_valid: 1,
      ifsc_code: "HDFC0005678",
      email_id: "john@example.com",
      mobile_no: "9123456780",
      state: "Delhi",
      merchant_name: "Merchant 2",
      scheme_name: "Scheme B",
      is_active: 0,
    },
    // Add more rows as needed
  ];

//   useEffect(() => {
//     fetchList();
//   }, []);

  const handleAddCustomer = () => {
    navigate("/AddCustomer");
  };

//   function fetchList() {
//     var CustomerList = [];
//     fetchCustomerList({}, (res) => {
//       if (res.status === 200) {
//         CustomerList = res.data;
//         console.log("CustomerList->", CustomerList);
//       }
//     });
//     console.log("CustomerList->", CustomerList);
//     return CustomerList;
//   }

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
                        <div className="col-sm-9">
                          <h1 className="m-0 pageTitle">Customer Management</h1>
                        </div>
                        <div className="col-sm-3">
                          <div className="addUserBtnDiv">
                            <button
                              className="btn addUser"
                              type="button"
                              onClick={handleAddCustomer}
                            >
                              <FontAwesomeIcon
                                icon={faCirclePlus}
                                className="fontIcon"
                              />
                              Add New Customer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tableDiv">
                        <GenericDataTable
                          data={rows} //{data} //
                          columns={columns}
                          detailpage={"CustomerDetails"}
                          editpage={"EditCustomer"}
                          deletepage={"DeleteCustomer"}
                          enablePagination={false}
                        />
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
