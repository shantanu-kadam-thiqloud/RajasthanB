import React, { useEffect, useState } from "react";
import DataTable  from "./HtmlComponents/DataTable";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./HtmlComponents/Spinner";
import { saveData } from "../Services/API-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";
const CustomerRequest = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("CustomerChecker");
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  //-----------------------------------------------------------------
  // const reduxData = useGetReduxData();
  // const reduxUser = reduxData.length != 0 ? reduxData.userData : "";
  // const cookieUser = getCookie("USER");
  // const USER =
  //   reduxUser === "" || reduxUser === undefined ? cookieUser : reduxUser;
  //-----------------------------------------------------------------
  useEffect(() => {
    setIsLoading(true);
    fetchUserRequsts();
  }, []);  

  const columns = [
    {
      Header: <div className="float-center">Request Id</div>,
      accessor: "requestId",
    },
    {
      Header: <div className="float-center">Customer Name</div>,
      accessor: "updatedValue.customer_name",
      Cell: ({ row }) => <div>{row.original.updatedValue.customer_name}</div>,
    },
    {
      Header: <div className="float-center">Customer Acct No</div>,
      accessor: "updatedValue.customer_account_no",
      Cell: ({ row }) => <div>{row.original.updatedValue.customer_account_no}</div>,
    },
    {
      Header: <div className="float-center">Request Type</div>,
      accessor: "requestType",
    },
    {
      Header: <div className="float-center">Request Date</div>,
      accessor: "createdDate",
      Cell: ({ row }) => <div>{row.values.createdDate}</div>,
    },
    {
      Header: <div className="float-center">Requested By</div>,
      accessor: "makerName",
    },
    {
      Header: <div className="float-center">Status</div>,
      accessor: "status",
    },    
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ row }) => (
        <div>          
          <FontAwesomeIcon
          icon={faEye}
          className="ViewIcon"
          onClick={() => {
            navigate(`/${action}`, {
              state: { requestData: row.original },
            });
          }}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
        </div>
      ),
    },
  ];

  //-------------------User Request List--------------------------------------------------------
  function fetchUserRequsts() {
    var reqList = [];
    const data = {userid: 1};
    const baseUrl = "http://172.16.16.113:8080/kmbl-rsbcl-api";
    saveData(data, `${baseUrl}/checkerListing`, (res) => {
      if (res.data) {
        reqList = res.data.responseListObject;
        const addList = (reqList || []).filter((x) => {
          if (x.tableName === "mst_customer") return x;
        });
        setRows(addList);
       // setRows(reqList);
       //mb2 console.log("reqList", reqList);
        setIsLoading(false);
      }
    },
    (error) => {
      setIsLoading(false);
      console.error("Error->", error);
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
      });
    });
  }
  //--------------------------------------------------------------------------------------------
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
                            Customer Requests
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row UserDetails mt-3 makerFields">                        
                        <div className="col-md-12 p-0">
                       <DataTable
                        columns={columns}
                        data={rows}
                        // customClass="ULTable"
                        // detailpage="UserDetails"
                        // editpage="EditUser"
                        //deletepage="DeleteUser"
                        enablePagination={true}
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
</div>
  );
};

export default CustomerRequest;
