import RestDataSource from "./Api-request";

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
