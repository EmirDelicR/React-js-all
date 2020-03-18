import axios from "axios";

const BASE_URL = process.env.REACT_APP_FIREBASE_URL;

const HTTP = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

const HTTP_AUTH = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

export { HTTP, HTTP_AUTH };
