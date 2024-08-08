import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSessionStorage } from "../Components/CommonComponents/cookieData";
// import { decryptData } from "./../Login/decryptionUtils";
// import {
//   getUserDataFromCookie,
//   removeUserDataCookie,
// } from "./../Login/cookieData";

export default class RestDataSource {
  async GetData(APIURL, callback) {
    this.SendRequest("get", APIURL, callback);
  }
  async PostData(APIURL, callback, data, LoginApi) {
    this.SendRequest("post", APIURL, callback, data, LoginApi);
  }
  async Update(APIURL, data, callback) {
    this.SendRequest("put", APIURL, callback, data);
  }
  async Delete(APIURL, data, callback) {
    this.SendRequest("delete", APIURL, callback, data);
  }

  async SendRequest(method, url, callback, data, LoginApi) {
    // const cookieLoginData = await getUserDataFromCookie();
    // const loginData = await decryptData(cookieLoginData);
    // let token = loginData !== null ? loginData.token : "";
    const AUTHUSER = getSessionStorage("AUTHUSER");
    const token = AUTHUSER?.token;
    try {
      let response = await axios.request({
        method: method,
        url: url,
        data: data,
        headers: {
          Authorization: `Bearer ${token === undefined ? "abc" : token}`,
        },
      });
      callback(response);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Session expired or invalid user, please login", {
            position: "top-right",
            autoClose: false,
          });
          //  removeUserDataCookie();
          //  setTimeout(function() { window.location.href = "/gps/"; }, 5000);
        } else if (error.response.status === 429) {
          toast.error("Too many requests, Please try after sometimes", {
            position: "top-right",
            autoClose: false,
          });
        } else {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: false,
          });
          callback(error.response);
        }
      }
      console.error("Error:", error);
    }
  }
}
