import React, { useEffect, useState } from "react";
import DataTable  from "../Components/HtmlComponents/DataTable";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../Components/HtmlComponents/Spinner";
import { saveData } from "./../Services/API-services";
// import {
//   DateFormatFunction,
//   getCookie,
//   useGetReduxData,
// } from "../Components/HtmlComponents/CommonFunction";
import { v4 as uuid } from "uuid";
const PendingApproval = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("CheckerDetails");
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
      accessor: "masterId",
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
      Header: <div className="float-center">Request Raised By</div>,
      accessor: "makerId",
    },
    // { Header: <div className="float-center">Role</div>, accessor: "role" },
    {
      Header: "Actions",
      accessor: "id",
      Cell: ({ row }) => (
        <div className="text-center">
          <button
            className="btn addUser dashbutton"
            type="button"
            onClick={() => {
              navigate(`/${action}`, {
                state: { requestData: row.original },
              });
            }}
          >
            Details
          </button>
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
        setRows(reqList);
        console.log("reqList", reqList);
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
      <Spinner isLoading={isLoading} />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="content">
            <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h2 className="mb-3 mt-3 pageTitle">User Requests</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11 mx-auto flex">              
              <DataTable
                columns={columns}
                data={rows}
                // customClass="ULTable"
                // detailpage="UserDetails"
                // editpage="EditUser"
                //deletepage="DeleteUser"
                enablePagination={false}
              />
            </div>{" "}
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
