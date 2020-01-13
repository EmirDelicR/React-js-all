import axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const HTTP = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
    // Authorization: "AUTH TOKEN"
  }
});

export { HTTP };
