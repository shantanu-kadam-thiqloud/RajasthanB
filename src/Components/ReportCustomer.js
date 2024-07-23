import React, { useEffect, useState } from "react";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { useNavigate } from "react-router-dom";
import { saveData } from "../Services/API-services";

export default function ReportCustomer() {
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState(null);
  const columns = [
    {
        field: "id",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "ID",
    },
    {
        field: "bank_id",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Bank ID",
    },
    {
        field: "sole_id",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Sole ID",
    },
    {
        field: "tran_type",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Transaction Type",
    },
    {
        field: "tran_date",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Transaction Date",
    },
    {
        field: "bank_tran_ref",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Bank Transaction Ref",
    },
    {
        field: "bank_trans_utr_no",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Bank Transaction UTR No",
    },
    {
        field: "tran_mode",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Transaction Mode",
    },
    {
        field: "van",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "VAN",
    },
    {
        field: "tran_amount",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Transaction Amount",
    },
    {
        field: "payee_upi_handle",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payee UPI Handle",
    },
    {
        field: "payee_ifsc_code",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payee IFSC Code",
    },
    {
        field: "remarks",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Remarks",
    },
    {
        field: "rsbcl_rsgsm_ac_no",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "RSBCL RSGSM AC No",
    },
    {
        field: "payment_to_ac_no",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payment To AC No",
    },
    {
        field: "payment_to_ac_Name",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payment To AC Name",
    },
    {
        field: "payment_to_account_ifsc_code",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payment To Account IFSC Code",
    },
    {
        field: "payee_ac_no",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Payee AC No",
    },
    {
        field: "fdr_no",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "FDR No",
    },
    {
        field: "interest_on_fdr",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Interest on FDR",
    },
    {
        field: "tds_on_fdr",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "TDS on FDR",
    },
    {
        field: "call_to_finacle",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Call to Finacle",
    },
    {
        field: "finacle_status",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Finacle Status",
    },
    {
        field: "closing_balance",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Closing Balance",
    },
    {
        field: "finacle_request_date_time",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Finacle Request Date Time",
    },
    {
        field: "data_posted_to_rsb",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Data Posted to RSB",
    },
    {
        field: "rsb_status",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "RSB Status",
    },
    {
        field: "rsb_request_date_time",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "RSB Request Date Time",
    },
    {
        field: "is_active",
        filter: true,
        showFilterMenu: false,
        header: "Is Active",
    },
    {
        field: "created_by",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Created By",
    },
    {
        field: "created_date",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Created Date",
    },
    {
        field: "last_modified_by",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Last Modified By",
    },
    {
        field: "last_modified_date",
        sortable: true,
        filter: true,
        showFilterMenu: false,
        header: "Last Modified Date",
    }
];

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
                        <div className="col-sm-12">
                          <h1 className="m-0 pageTitle">Customer Maintenance Reports</h1>
                        </div>                        
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="tableDiv">
                        <GenericDataTable
                          data={customerList} //{data} //
                          columns={columns}                         
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
