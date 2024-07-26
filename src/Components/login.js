import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import loginImage from "../Assets/img/slogin.avif";
import { setSessionStorage } from "../Components/CommonComponents/cookieData";
import { useNavigate } from "react-router-dom";
import "./CommonComponents/style.css";
import LOGO from "../Assets/img/kotak-mahindra-bank-logo.png";
import { toast } from "react-toastify";
import { encryptValue } from "./HtmlComponents/CommonFunction";
import { saveData } from "../Services/API-services";
const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});
const Login = () => {
  const initialValues = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const encryptedPassword = encryptValue(values.password);
    const encryptedUserName = encryptValue(values.username);
    const requestBody = {
      userName: encryptedUserName, //"kxt71325",
      userPassword: encryptedPassword, //"Dell@123",
    };
    const baseUrl = process.env.REACT_APP_API_URL;
    saveData(
      requestBody,
      `${baseUrl}/userlogin`,
      (response) => {
        if (response.status === 200) {
          const user = response.data.responseObject;
          const userData = {
            userId: user.userId,
            firstName: user.firstName,
            emailId: user.emailId,
            userName: user.userName,
            lastLoginDateTime: user.lastLoginDateTime,
            roleId: user.roleId,
            role_name: user.role_name,
          };
          setSessionStorage("USER", userData);
          toast.success("Login successfully !", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate("/Dashboard");
        }
      },
      (error) => {
        console.log("Error->", error.message);
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    );
  };

  return (
    <div>
      <div className="loginHeader">
        <div className="row">
          <div className="col-md-12 text-left">
            <a href="index3.html" className="brand-link ml-auto">
              <img
                src={LOGO} //"dist/img/AdminLTELogo.png"
                alt="AdminLTE Logo"
                className="brand-image "
              />
              <div className="brand-text font-weight-light"></div>
            </a>
          </div>
        </div>
      </div>
      <div className="content-wrapper contentwrapper">
        <div className="content-header">
          <div className="content contentBox">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-right">
                  <img src={loginImage} alt="Login" className="imgFluid" />
                </div>
                <div className="col-md-6 contents">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                        onSubmit={handleSubmit}
                      >
                        {() => (
                          <Form>
                            <h2 className="mb-3 pageTitle">Log in</h2>
                            <hr className="hr mb-3" />
                            <div className="mb-2">
                              <label htmlFor="username">Username</label>
                              <Field
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                placeholder="Enter your username"
                                maxLength="50"
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <div className="mb-2">
                              <label htmlFor="password">Password</label>
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter your password"
                                maxLength="50"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                className="text-danger"
                              />
                            </div>

                            <button type="submit" className="btn  loginButton">
                              Login
                            </button>
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
};

export default Login;
