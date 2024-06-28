import RestDataSource from "./Api-request";
import { Global_var } from "../Global_VAR";

export function getData(QueryStringData, APIURL, res) {
  const URL = `${APIURL}?id=${QueryStringData}`;
  return new RestDataSource().GetData(URL, res);
}

export function saveData(MappingData, APIURL, res) {
  return new RestDataSource().PostData(APIURL, res, MappingData);
}
//---------------------------------------------------------------------------------------------------
export function fetchUserList(APIURL, res) {
 // const URL = Global_var.BASEURL + Global_var.URL_GET_ALL_USERS;
  //"http://172.16.16.113:8080/kmbl-rsbcl-api/getallusers";
  //`${APIURL}?id=${QueryStringData}`;
  return new RestDataSource().GetData(APIURL, res);
}
