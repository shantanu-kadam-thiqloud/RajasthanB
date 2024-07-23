import React, { useEffect, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
import { saveData } from "../Services/API-services";

export default function Customers() {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState(null);
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
    // {
    //   field: "is_account_valid",
    //   sortable: true,
    //   filter: true,
    //   showFilterMenu: false,
    //   header: "Status",
    // },
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
      field: "is_active",
      //sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Is Active",
      // className: "text-center",
    },
    // {
    //   field: "state",
    //   sortable: true,
    //   filter: true,
    //   showFilterMenu: false,
    //   header: "State",
    // },
    // {
    //   field: "merchant_name",
    //   sortable: true,
    //   filter: true,
    //   showFilterMenu: false,
    //   header: "Merchant Name",
    // },
    // {
    //   field: "scheme_name",
    //   sortable: true,
    //   filter: true,
    //   showFilterMenu: false,
    //   header: "Scheme Name",
    // },    
    {
      field: "",
      header: "Action",
      // className: "text-center",
      body: "buttonsTemplate",
    },
  ];

  const handleAddCustomer = () => {
    navigate("/AddCustomer");
  };

  useEffect(() => {
    const data = "";
    function fetchList() {
      const baseUrl = process.env.REACT_APP_API_URL;
      saveData(data,`${baseUrl}/getallcustomers`, (response) => {
        if (response.status === 200) {
          setCustomerList(response.data.responseListObject);        
        }
      });
    }
    fetchList();
  }, []);

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
                          <h1 className="m-0 pageTitle">Customer Maintenance</h1>
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
                    {customerList && (
                    <div className="card-body">
                      <div className="tableDiv">
                        <GenericDataTable
                          data={customerList} //{data} //
                          columns={columns}
                          detailpage={"CustomerDetails"}
                          editpage={"EditCustomer"}
                          deletepage={""}
                          enablePagination={false}
                        />
                      </div>
                    </div>
                    )}
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
