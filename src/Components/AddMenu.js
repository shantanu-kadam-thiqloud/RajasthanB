import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AddMenu() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const menuId = location.state ? location.state.menu.id : "";
  const [menu, setMenu] = useState({});
  const path = window.location.pathname;
  const isEdit = path.includes("EditMenu") ? true : false;
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    menu_name: Yup.string()
      .max(255, "Menu Name must be 255 characters or less")
      .required("Menu Name is required"),
    is_active: Yup.number()
      .oneOf([0, 1], "Is Active must be either 0 or 1")
      .required("Is Active is required"),
    menu_url_name: Yup.string()
      .max(255, "Menu URL Name must be 255 characters or less")
      .required("Menu URL Name is required"),
    menu_url: Yup.string()
      .url("Invalid URL format")
      .max(255, "Menu URL must be 255 characters or less")
      .required("Menu URL is required"),
    menu_description: Yup.string()
      .max(255, "Menu Description must be 255 characters or less")
      .required("Menu Description is required"),
  });

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
    }
  }, [isEdit]);

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setIsLoading(true);
    if (isEdit) {
      EditMenu(values);
    } else {
      AddMenu(values);
    }
  };

  function AddMenu(values) {}
  function EditMenu(values) {}

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
                            {isEdit ? "Edit" : "Add"} Menu
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Formik
                        initialValues={{
                          menu_name: isEdit ? menu.menu_name : "",
                          is_active: isEdit ? menu.is_active : 0,
                          menu_url_name: isEdit ? menu.menu_url_name : "",
                          menu_url: isEdit ? menu.menu_url : "",
                          menu_description: isEdit ? menu.menu_description : "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div className="modal-body">
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="menu_name"
                                      className="form-label required"
                                    >
                                      Menu Name
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="menu_name"
                                      name="menu_name"
                                      placeholder="Enter menu name"
                                      maxLength="255"
                                    />
                                    <ErrorMessage
                                      name="menu_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="is_active"
                                      className="form-label required"
                                    >
                                      Is Active
                                    </label>
                                    <Field
                                      as="select"
                                      className="form-control form-select"
                                      id="is_active"
                                      name="is_active"
                                    >
                                      <option value="1">Active</option>
                                      <option value="0">Inactive</option>
                                    </Field>
                                    <ErrorMessage
                                      name="is_active"
                                      component="div"
                                      className="error"
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="menu_url_name"
                                      className="form-label required"
                                    >
                                      Menu URL Name
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="menu_url_name"
                                      name="menu_url_name"
                                      placeholder="Enter menu URL name"
                                      maxLength="255"
                                    />
                                    <ErrorMessage
                                      name="menu_url_name"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label
                                      htmlFor="menu_url"
                                      className="form-label required"
                                    >
                                      Menu URL
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="menu_url"
                                      name="menu_url"
                                      placeholder="Enter menu URL"
                                      maxLength="255"
                                    />
                                    <ErrorMessage
                                      name="menu_url"
                                      component="div"
                                      className="error"
                                    />
                                  </div>

                                  <div className="mb-3">
                                    <label
                                      htmlFor="menu_description"
                                      className="form-label required"
                                    >
                                      Menu Description
                                    </label>
                                    <Field
                                      type="text"
                                      className="form-control"
                                      id="menu_description"
                                      name="menu_description"
                                      placeholder="Enter menu description"
                                      maxLength="255"
                                    />
                                    <ErrorMessage
                                      name="menu_description"
                                      component="div"
                                      className="error"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-footer">
                              <button
                                className="btn BackBtn me-2"
                                type="button"
                                onClick={() => {
                                  navigate("/Menu");
                                }}
                              >
                                Back to List
                              </button>
                              <button
                                className="btn addUser min me-2"
                                type="submit"
                              >
                                Submit
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
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
