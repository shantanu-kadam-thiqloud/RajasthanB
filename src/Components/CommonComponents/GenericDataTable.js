import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api"; // Import FilterMatchMode
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./GenricPagination.css";

const GenericDataTable = ({
  data,
  columns,
  detailpage,
  editpage,
  deletepage,
  enablePagination,
  onFilter,
}) => {
  const navigate = useNavigate();
  const [switchStates, setSwitchStates] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [rowdata, setRData] = useState("");
  const [filterValue, setFilterValue] = useState({});
  const [filteredData, setFilteredData] = useState(data);

  const handleFilter = (e) => {
    const filters = e.filters || {}; // Ensure filters is always an object
    setFilterValue(filters);
    applyFilters(filters);
  };

  const applyFilters = (filters) => {
    let filtered = data;

    // Ensure filters is an object
    filters = filters || {};

    for (let field in filters) {
      const filter = filters[field];

      // Check if filter and filter.value are defined
      if (filter && filter.value != null) {
        const filterValue = filter.value.toLowerCase();

        // Handle different matchModes if applicable
        if (filter.matchMode === FilterMatchMode.CONTAINS) {
          filtered = filtered.filter((item) =>
            String(item[field] || "")
              .toLowerCase()
              .includes(filterValue)
          );
        } else if (filter.matchMode === FilterMatchMode.STARTS_WITH) {
          filtered = filtered.filter((item) =>
            String(item[field] || "")
              .toLowerCase()
              .startsWith(filterValue)
          );
        } else if (filter.matchMode === FilterMatchMode.EQUALS) {
          filtered = filtered.filter(
            (item) => String(item[field] || "").toLowerCase() === filterValue
          );
        }
      }
    }

    setFilteredData(filtered);
    if (onFilter) onFilter(filtered);
  };

  const switchTemplate = (row) => (
    <Switch
      id={`flexSwitchCheckChecked-${row.id}`}
      checked={switchStates[row.id] || false}
      className="ActiveSwitch"
      readOnly={true}
    />
  );

  const buttonsTemplate = (row) => (
    <>
      {detailpage && (
        <FontAwesomeIcon
          icon={faEye}
          className="ViewIcon"
          onClick={() => handleEyeAction(row)}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
      )}
      {editpage && (
        <FontAwesomeIcon
          icon={faEdit}
          className="EditIcon"
          style={{ cursor: "pointer", marginRight: "8px" }}
          onClick={() => handleEditAction(row)}
        />
      )}
      {deletepage && (
        <FontAwesomeIcon
          icon={faTrash}
          style={{ cursor: "pointer" }}
          onClick={() => handleTrashAction(row)}
        />
      )}
    </>
  );

  const handleEyeAction = (user) =>
    navigate(`/${detailpage}`, { state: { user } });
  const handleEditAction = (user) =>
    navigate(`/${editpage}`, { state: { user } });
  const handleTrashAction = (user) =>
    navigate(`/${deletepage}`, { state: { user } });

  const accountValidityTemplate = (row) =>
    row.is_account_valid ? "Active" : "Inactive";
  const accountIsActiveTemplate = (row) =>
    row.is_active ? "Active" : "Inactive";

  const getTemplate = (field, template) => {
    if (field === "isActive") return switchTemplate;
    if (field === "") return buttonsTemplate;
    if (field === "is_account_valid") return accountValidityTemplate;
    if (template === "HyperLinkTemplate") return createTemplate(field);
    if (field === "is_active") return accountIsActiveTemplate;
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

  return (
    <DataTable
      value={filteredData}
      removableSort
      filterDisplay="row"
      showGridlines
      tableStyle={{ minWidth: "50rem" }}
      paginator={enablePagination}
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
      currentPageReportTemplate=" Page {currentPage} of  {totalPages}, Total Records {totalRecords}"
      onFilter={handleFilter}
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
        />
      ))}
    </DataTable>
  );
};

export default GenericDataTable;
