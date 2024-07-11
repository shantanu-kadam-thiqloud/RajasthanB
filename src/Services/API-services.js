import RestDataSource from "./Api-request";
import { Global_var } from "../Global_VAR";

let BaseUrl = Global_var.BASEURL;

export function getData(QueryStringData, APIURL, res) {
  const URL = `${APIURL}?id=${QueryStringData}`;
  return new RestDataSource().GetData(URL, res);
}

export function saveData(MappingData, APIURL, res) {
  return new RestDataSource().PostData(APIURL, res, MappingData);
}

export function fetchUserList(APIURL, res) {
  return new RestDataSource().GetData(APIURL, res);
}

export function loginUser(req, res) {
  return new RestDataSource().PostData(
    BaseUrl + Global_var.URL_LOGIN,
    res,
    req
  );
}

export function fetchRoles(req, res) {
  return new RestDataSource().GetData(BaseUrl + Global_var.URL_FETCH_ROLE, res);
}

export function makeRequest(req, res) {
  return new RestDataSource().PostData(
    BaseUrl + Global_var.URL_MAKE_REQUEST,
    res,
    req
  );
}

export function checkRequest(req, res) {
  return new RestDataSource().PostData(
    BaseUrl + Global_var.URL_CHECK_REQUEST,
    res,
    req
  );
}

export function fetchRequests(req, res) {
  return new RestDataSource().PostData(
    BaseUrl + Global_var.URL_REQUEST_LIST,
    res,
    req
  );
}
