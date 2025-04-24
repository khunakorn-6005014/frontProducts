//react-app react-axios-typescript-example/http-common.ts
//Defines a centralized Axios instance to simplify API calls.
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/api/v1/products",
  headers: {
    "Content-type": "application/json"
  }
});