import React, { useEffect, useState } from "react";
import DataTable from "./HtmlComponents/DataTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "./HtmlComponents/Spinner";
import { saveData } from "../Services/API-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuid } from "uuid";
import { DateFormatFunction } from "./HtmlComponents/CommonFunction";

const RoleRequest = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("RoleChecker");
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetchRoleRequsts();
  }, []);

  const columns = [
    {
      Header: <div className="float-center">Request Id</div>,
      accessor: "requestId",
    },
    // {
    //   Header: <div className="float-center">Role Name</div>,
    //   accessor: "updatedValue.role_name",
    //   Cell: ({ row }) => <div>{row.original.updatedValue.role_name}</div>,
    // },
    {
      Header: <div className="float-center">Request Type</div>,
      accessor: "requestType",
    },
    {
      Header: <div className="float-center">Request Date</div>,
      accessor: "makerTimestamp",
      Cell: ({ row }) => (
        <div>{DateFormatFunction(row.values.makerTimestamp)}</div>
      ),
    },
    {
      Header: <div className="float-center">Requested By</div>,
      accessor: "createdBy",
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
  function fetchRoleRequsts() {
    var reqList = [];
    const requestBody = { userid: 1 };
    const baseUrl = process.env.REACT_APP_API_URL;
    saveData(
      requestBody,
      `${baseUrl}/checkerListing`,
      (res) => {
        if (res.data) {
          reqList = res.data.responseListObject;
          const roleReqList = (reqList || []).filter((x) => {
            if (x.tableName === "mst_sb_roles") return x;
          });
          setRows(roleReqList);
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
      }
    );
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
                          <h1 className="m-0 pageTitle">Role Requests</h1>
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

export default RoleRequest;
