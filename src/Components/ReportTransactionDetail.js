import React, { useEffect, useState } from "react";
import GenericDataTable from "./CommonComponents/GenericDataTable";
import { saveData } from "../Services/API-services";
import { Formik, Field, ErrorMessage, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { addDays } from "date-fns";
import { getSessionStorage } from "../Components/CommonComponents/cookieData";
import { toast } from "react-toastify";
import ExcelJS from "exceljs";

export default function ReportTransactionDetail() {
  var initialValues = {
    customerName: "",
    fromDate: "",
    toDate: "",
  };
  const [filterData, setFilterData] = useState({
    customerName: "",
    fromDate: "",
    toDate: "",
  });
  const [customerList, setCustomerList] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [dataFound, setDataFound] = useState(false);
  const [loginData, setLoginData] = useState({});
  const [exportData, setExportData] = useState({});

  const handleFilter = (filteredData) => {
    setExportData(filteredData);
  };
  const StateData = [
    "Andaman And Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu And Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "The Dadra And Nagar Haveli And Daman And Diu",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
  ];

  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const cookieLoginData = await getSessionStorage("USER");
        setLoginData(cookieLoginData);
      } catch (error) {
        console.error("Error fetching login data:", error);
      }
    };
    fetchLoginData();
  }, []);
  const columns = [
    // {
    //     field: "id",
    //     sortable: true,
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "ID",
    // },
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
      header: "Parent AC No",
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
      header: "Data Posted to Client",
    },
    {
      field: "rsb_status",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Client Status",
    },
    {
      field: "rsb_request_date_time",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "Client Request Date Time",
    },
    {
      field: "dataReceivedFrom",
      sortable: true,
      filter: true,
      showFilterMenu: false,
      header: "data Received From",
    },
    // {
    //     field: "is_active",
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "Is Active",
    // },
    // {
    //     field: "created_by",
    //     sortable: true,
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "Created By",
    // },
    // {
    //     field: "created_date",
    //     sortable: true,
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "Created Date",
    // },
    // {
    //     field: "last_modified_by",
    //     sortable: true,
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "Last Modified By",
    // },
    // {
    //     field: "last_modified_date",
    //     sortable: true,
    //     filter: true,
    //     showFilterMenu: false,
    //     header: "Last Modified Date",
    // }
  ];
  useEffect(() => {
    const data = "";
    function fetchList() {
      const baseUrl = process.env.REACT_APP_API_URL;
      saveData(data, `${baseUrl}/getallcustomers`, (response) => {
        if (response.status === 200) {
          setCustomerList(response.data.responseListObject);
        }
      });
    }
    fetchList();
  }, []);

  const clearFilterData = () => {
    setFilterData(initialValues);
    setRequestData([]);
    setExportData([]);
    setDataFound(false);
  };

  const getTableData = async (values) => {
    setDataFound(false);
    const formattedData = {
      fromDate: values.fromDate
        ? moment(values.fromDate).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      toDate: values.toDate
        ? moment(addDays(values.toDate, 1)).format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD"),
      customerName:
        values.customerName !== undefined ? values.customerName : "",
      state: values.state !== undefined ? values.state : "",
    };
    //const atLeastOneValueSet = Object.values(formattedData).some(value => value !== "");
    if (formattedData.customerName !== "") {
      setFilterData(formattedData);
      const dataToSend = {
        username: loginData.userName, //encryptUsername
        filterData: formattedData,
      };
      const baseUrl = "http://172.16.16.106:8080/kmbl-rsbcl-api"; //process.env.REACT_APP_BASE_URL;
      await saveData(
        dataToSend,
        `${baseUrl}/eCollection_report`,
        (response) => {
          if (response.data && response.data.message !== "No data found") {
            setRequestData(response.data.responseListObject);
            setExportData(response.data.responseListObject);
            setDataFound(true);
          } else if (
            response.data &&
            response.data.message === "No data found"
          ) {
            setRequestData([]);
            setExportData([]);
            setDataFound(false);
          }
        }
      );
    } else {
      toast.error("Select the Customer Name", {
        position: "top-right",
        autoClose: false,
      });
    }
  };

  async function exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Transaction Detail");
    // const columns = Object.keys(columns).map(key => ({
    //     header: key.header,
    //     key: key.field,
    // }));
    const columnsMapped = columns.map((column) => ({
      header: column.header,
      key: column.field,
    }));
    sheet.columns = columnsMapped;
    exportData.forEach((item) => {
      sheet.addRow(item);
    });
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Transation_Detail.xlsx";
    a.click();
    URL.revokeObjectURL(url);
  }

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
                          <h1 className="m-0 pageTitle">
                            Transaction Detail Reports
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row alignCenter">
                        <div className="col-sm-12">
                          <Formik
                            initialValues={{ initialValues }}
                            enableReinitialize={true}
                            onSubmit={(values, { resetForm }) => {
                              clearFilterData();
                              resetForm({ values: initialValues });
                            }}
                          >
                            {({ values, setFieldValue }) => (
                              <Form>
                                <div className="col-12">
                                  <div className="row">
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label htmlFor="customerName">
                                          Customer Name
                                          <span className="Fieldrequired">
                                            *
                                          </span>
                                        </label>
                                        <Field
                                          as="select"
                                          className="form-control"
                                          id="customerName"
                                          name="customerName"
                                          value={values.customerName}
                                          onChange={(e) =>
                                            setFieldValue(
                                              "customerName",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="">
                                            Select a customer
                                          </option>
                                          {customerList &&
                                            customerList.map((customer) => (
                                              <option
                                                key={customer.customer_name}
                                                value={customer.customer_name}
                                              >
                                                {customer.customer_name}
                                              </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                          name="customerName"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3">
                                      <div className="form-group">
                                        <label htmlFor="customerName">
                                          State
                                        </label>
                                        <Field
                                          as="select"
                                          className="form-control"
                                          id="state"
                                          name="state"
                                          value={values.state}
                                          onChange={(e) =>
                                            setFieldValue(
                                              "state",
                                              e.target.value
                                            )
                                          }
                                        >
                                          <option value="" className="greyText">
                                            Select State
                                          </option>
                                          {StateData.map((state, index) => (
                                            <option key={index} value={state}>
                                              {state}
                                            </option>
                                          ))}
                                        </Field>
                                        <ErrorMessage
                                          name="state"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label htmlFor="fromDate">
                                          From Date
                                        </label>
                                        <DatePicker
                                          id="fromDate"
                                          name="fromDate"
                                          className="form-control"
                                          dateFormat="dd-MMM-yyyy"
                                          selected={values.fromDate}
                                          onChange={(date) =>
                                            setFieldValue("fromDate", date)
                                          }
                                        />
                                        <ErrorMessage
                                          name="fromDate"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-2">
                                      <div className="form-group">
                                        <label htmlFor="toDate">To Date</label>
                                        <DatePicker
                                          id="toDate"
                                          name="toDate"
                                          className="form-control"
                                          dateFormat="dd-MMM-yyyy"
                                          selected={values.toDate}
                                          onChange={(date) =>
                                            setFieldValue("toDate", date)
                                          }
                                        />
                                        <ErrorMessage
                                          name="toDate"
                                          component="div"
                                          className="error"
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-3 mt-20">
                                      <button
                                        type="button"
                                        onClick={() => getTableData(values)}
                                        className="btn addUser"
                                      >
                                        Search
                                      </button>
                                      <button
                                        type="submit"
                                        className="btn addUser"
                                      >
                                        Reset Filter
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Form>
                            )}
                          </Formik>
                        </div>
                      </div>
                      {dataFound && (
                        <>
                          <div className="wrapper text-end exportDiv">
                            <button
                              className="btn BackBtn"
                              onClick={exportToExcel}
                            >
                              Export to Excel
                            </button>
                          </div>
                          <div className="tableDiv">
                            <GenericDataTable
                              data={requestData}
                              columns={columns}
                              enablePagination={true}
                              onFilter={handleFilter}
                            />
                          </div>
                        </>
                      )}
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
