import axios from "axios";
import { BASE_URL } from "./axios.js";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: { "Content-type": "application/json" },
});

const interceptorsMap = new Map();

let requestInterceptor;
let responseInterceptor;
if (!interceptorsMap.has("requestInterceptor")) {
  requestInterceptor = axiosPublic.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error),
  );
  interceptorsMap.set("requestInterceptor", requestInterceptor);
}

if (!interceptorsMap.has("responseInterceptor")) {
  responseInterceptor = axiosPublic.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;

      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        return axiosPublic(prevRequest);
      }
      return Promise.reject(error);
    },
  );
  interceptorsMap.set("responseInterceptor", responseInterceptor);
}
