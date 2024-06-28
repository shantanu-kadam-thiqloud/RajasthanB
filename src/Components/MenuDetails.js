import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function MenuDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const path = window.location.pathname;
  const menuId = location.state ? location.state.menu.id : "";
  const locationData = location.state ? location.state.menu : {};
  const isDelete = path.includes("DeleteMenu") ? true : false;

  useEffect(() => {
    // setIsLoading(true);
    // fetchMenuById();
  }, []);

  if (!menu) {
    return <p>Menu not found.</p>;
  }
  //----------------------Get Menu--------------------------------------------
  function fetchMenuById() {}
  //----------------------Delete Menu-----------------------------------------
  function DeleteMenu() {}

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
                            {isDelete ? "Delete Menu" : "Menu Details"}
                          </h1>
                        </div>
                        <div className="col-sm-2"></div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row MenuDetails mt-3">
                        {isDelete ? (
                          <h4 className="col-md-12 mb-5 mx-5">
                            Are you sure you want to delete this ?
                          </h4>
                        ) : (
                          ""
                        )}
                        <div className="col-md-6 mx-auto">
                          <div className="col-md-6 MDCoulmns">
                            <strong>Menu Name :</strong>
                          </div>
                          <div className="col-md-6 MDCoulmns">
                            {menu.menu_name}
                          </div>

                          <div className="col-md-6 MDCoulmns">
                            <strong>Menu URL Name :</strong>
                          </div>
                          <div className="col-md-6 MDCoulmns">
                            {menu.menu_url_name}
                          </div>

                          <div className="col-md-6 MDCoulmns">
                            <strong>Menu URL :</strong>
                          </div>
                          <div className="col-md-6 MDCoulmns">{menu.menu_url}</div>

                          <div className="col-md-6 MDCoulmns">
                            <strong>Menu Description :</strong>
                          </div>
                          <div className="col-md-6 MDCoulmns">
                            {menu.menu_description}
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="col-md-6 MDCoulmns">
                            <strong>Status :</strong>
                          </div>
                          <div className="col-md-6 MDCoulmns">
                            {menu.is_active ? "Active" : "Inactive"}
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row float-right">
                        <button
                          className="btn BackBtn"
                          type="button"
                          onClick={() => {
                            navigate("/Menu");
                          }}
                        >
                          Back to List
                        </button>

                        <button
                          className="btn addMenu"
                          type="button"
                          onClick={() => {
                            if (isDelete) {
                              // DeleteMenu();
                            } else {
                              navigate(`/EditMenu`, {
                                state: { menu },
                              });
                            }
                          }}
                        >
                          {isDelete ? "Delete" : "Edit"}
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
  );
}
