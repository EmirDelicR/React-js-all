import { HTTP, HTTP_AUTH } from "../../plugins/axios";
import { API_REQUEST_TYPES } from "../constants";

/**
 *
 * @param {String} url
 * @param {String} type [POST, GET, PUT ...]
 * @param {Object} data
 * @param {String} token
 */
const makeApiRequest = async (
  url,
  type = API_REQUEST_TYPES.get,
  data = null,
  token = null
) => {
  let auth = {};

  if (token) {
    auth = setAuthorization(token);
  }

  try {
    switch (type) {
      case API_REQUEST_TYPES.get:
        return await HTTP.get(url, auth);
      case API_REQUEST_TYPES.post:
        return await HTTP.post(url, data, auth);
      case API_REQUEST_TYPES.put:
        return await HTTP.put(url, data, auth);
      case API_REQUEST_TYPES.delete:
        return await HTTP.delete(url, auth);
      default:
        console.log(`Type [${type}] is not valid!`);
        return null;
    }
  } catch (error) {
    console.log(`[Error from ${type}] `, error);
    return error;
  }
};

const makeAuthRequest = async (url, type, data) => {
  try {
    return await HTTP_AUTH.post(url, data);
  } catch (error) {
    console.log(`[Error from Auth request ${type}] `, error);
    return error;
  }
};

const setAuthorization = token => {
  return { headers: { Authorization: "Barer " + token } };
};

const isResponseSuccess = response => {
  if (response && response.status >= 200 && response.status < 300) {
    return true;
  }
  return false;
};

export { makeApiRequest, isResponseSuccess, makeAuthRequest };
