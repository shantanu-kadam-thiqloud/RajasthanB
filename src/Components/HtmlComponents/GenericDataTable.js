import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Switch from "@mui/material/Switch";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Hyperlink from "../Home/Hyperlink";
import "./GenricPagination.css";
import { Dropdown } from "primereact/dropdown";

const GenericDataTable = ({
  data,
  columns,
  detailpage,
  editpage,
  deletepage,
  enablePagination,
  onFilter,
  onPage,
  totalRecords,
  customPageOption,
  onRowsPerPageChange,
  rows,
  first,
}) => {
  const [switchStates, setSwitchStates] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [rowdata, setRData] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const navigate = useNavigate();
  const location = useLocation();
  const switchTemplate = (row) => (
    <Switch
      id={`flexSwitchCheckChecked-${row.id}`}
      checked={switchStates[row.id] || false}
      onChange={() => handleSwitchToggle(row.id)}
      className="ActiveSwitch"
    />
  );

  const buttonsTemplate = (row) => (
    <>
      {detailpage === "" ? (
        ""
      ) : (
        <FontAwesomeIcon
          icon={faEye}
          onClick={() => handleEyeAction(row)}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
      )}
      {editpage === "" ? (
        ""
      ) : (
        <FontAwesomeIcon
          icon={faEdit}
          style={{ cursor: "pointer", marginRight: "8px" }}
          onClick={() => handleEditAction(row)}
        />
      )}
      {deletepage === "" ? (
        ""
      ) : (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: "pointer" }}
          onClick={() => handleTrashAction(row)}
        />
      )}
    </>
  );

  useEffect(() => {
    const initialSwitchStates = data.reduce((acc, row) => {
      acc[row.id] = row.isActive;
      return acc;
    }, {});
    setSwitchStates(initialSwitchStates);
  }, [data]);

  const handleSwitchToggle = (rowId) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const handleEyeAction = (user) => {
    navigate(`/NHAI/${detailpage}`, { state: { user } });
    //${user.id}`);
  };
  const handleEditAction = (user) => {
    navigate(`/NHAI/${editpage}`, { state: { user } });
    //${user.id}`);
  };
  const handleTrashAction = (user) => {
    navigate(`/NHAI/${deletepage}`, { state: { user } });
    //${user.id}`);
  };

  const getTemplate = (field, template) => {
    if (field === "isActive") {
      return switchTemplate;
    } else if (field === "") {
      return buttonsTemplate;
    } else if (template === "HyperLinkTemplate") {
      return createTemplate(field);
    }
  };

  const createTemplate = (fieldName) => (row) =>
    (
      <a
        href="#"
        onClick={() => {
          setRData(row);
          setIsOpen(true);
        }}
        style={{ color: "black" }}
      >
        {row[fieldName]}
      </a>
    );

  const handleRowsPerPageChange = (event) => {
    setPageSize(event.value);
    onRowsPerPageChange(event.value);
  };

  return (
    <>
      {/* <div className="ui-datatable"> */}

      <DataTable
        value={data}
        removableSort
        filterDisplay="row"
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        paginator={enablePagination}
        rows={pageSize}
        first={customPageOption ? first : 0}
        rowsPerPageOptions={customPageOption ? null : [5, 10, 20, 25, 50]}
        // className="ui-datatable"
        paginatorTemplate={
          customPageOption
            ? "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            : "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        }
        currentPageReportTemplate={
          customPageOption
            ? `Page {currentPage} of ${Math.ceil(totalRecords / pageSize)}`
            : " Page {currentPage}"
        } // of  {totalRecords} " //"{first} to {last} of {totalRecords}"
        // "FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        onFilter={onFilter}
        onPage={onPage}
        totalRecords={totalRecords}
      >
        {columns.map((column) => (
          <Column
            key={column.field}
            field={column.field}
            sortable={column.sortable}
            filter={column.filter}
            filterPlaceholder="Search"
            showGridlines={column.showGridlines}
            showFilterMenu={column.showFilterMenu}
            header={column.header}
            className={column.className}
            body={getTemplate(column.field, column.body)}
            editor={column.editor}
          ></Column>
        ))}
      </DataTable>
      {customPageOption && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: "-2rem",
          }}
        >
          <div className="col-md-8"></div>
          <div className="col-md-1">
            {" "}
            <Dropdown
              className="customD"
              value={pageSize}
              options={[
                { label: "5", value: 5 },
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "25", value: 25 },
                { label: "50", value: 50 },
              ]} // Set your available page sizes here
              onChange={handleRowsPerPageChange}
            />
          </div>
        </div>
      )}
      {/* </div> */}
      <Hyperlink isOpen={isOpen} setModal={setIsOpen} row={rowdata} />
    </>
  );
};

export default GenericDataTable;
