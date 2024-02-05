import axios from "axios";
import { BASE_URL } from "./axios.js";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: { "Content-type": "application/json" },
});

const interceptorsMap = new Map();

let requestInterceptor;
let responseInterceptor;
let authToken;

export const addInterceptors = (auth, refresh) => {
  authToken = auth?.accessToken;
  if (!interceptorsMap.has("requestInterceptor")) {
    requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    interceptorsMap.set("requestInterceptor", requestInterceptor);
  }

  if (!interceptorsMap.has("responseInterceptor")) {
    responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const data = await (await refresh)();
          authToken = data.accessToken;
          prevRequest.headers["Authorization"] = `Bearer ${authToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    interceptorsMap.set("responseInterceptor", responseInterceptor);
  }
};

export const removeInterceptors = () => {
  axios.interceptors.request.eject(requestInterceptor);
  axios.interceptors.request.eject(responseInterceptor);
  interceptorsMap.clear();
};
