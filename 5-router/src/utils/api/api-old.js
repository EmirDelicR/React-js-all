import { HTTP } from "../../plugins/axios";

/**
 *
 * @param url - url to api call example cities/  make cal to(/api/cities/)
 * @param token - user token default null
 * @returns response from server
 */
const getApiData = async (url, token = null) => {
  let auth = {};
  try {
    if (token) {
      auth = setAuthorization(token);
    }
    let result = await HTTP.get(url, auth);

    return result;
  } catch (error) {
    console.log("[Error from GET] ", error);
    return error.response;
  }
};

/**
 *
 * @param url to api call example cities/  make cal to(/api/cities/)
 * @param data
 * @param token - user token default null
 * @returns response from server
 */
const postApiRequest = async (url, data, token = null) => {
  let auth = {};
  /**
   *  Axios do this automatically but just for reference
   *  const jsonData = JSON.stringify(data);
   *  */
  try {
    if (token) {
      auth = setAuthorization(token);
    }

    let result = await HTTP.post(url, data, auth);

    return result;
  } catch (error) {
    console.log("[Error from POST] ", error);
    /** This response is depending on backed responds make an agreement of response format for all calls */
    if (typeof error.response !== "undefined") {
      return error.response;
    }

    return {
      data: {
        message: error.message || error
      }
    };
  }
};

/**
 *
 * @param url to api call example cities/  make cal to(/api/cities/)
 * @param data
 * @param token - user token default null
 * @returns response from server
 */
const putApiRequest = async (url, data, token = null) => {
  let auth = {};
  // const jsonData = JSON.stringify(data);

  try {
    if (token) {
      auth = setAuthorization(token);
    }

    let result = await HTTP.put(url, data, auth);

    return result;
  } catch (error) {
    console.log("[Error from PUT] ", error);
    return error.response;
  }
};

/**
 *
 * @param url to api call example cities/  make cal to(/api/cities/)
 * @param data
 * @param token - user token default null
 * @returns response from server
 */
const deleteApiRequest = async (url, token = null) => {
  let auth = {};

  try {
    if (token) {
      auth = setAuthorization(token);
    }

    let result = await HTTP.delete(url, auth);

    return result;
  } catch (error) {
    console.log("[Error from DELETE] ", error);
    return error.response;
  }
};

const isResponseNotSuccess = response => {
  if (!response || response.status !== 200) {
    console.log("REQUEST WAS NOT EXECUTED SUCCESSFULLY!");
    return true;
  }
  return false;
};

const setAuthorization = token => {
  return { headers: { Authorization: "Barer " + token } };
};

export {
  getApiData,
  postApiRequest,
  putApiRequest,
  deleteApiRequest,
  isResponseNotSuccess
};
