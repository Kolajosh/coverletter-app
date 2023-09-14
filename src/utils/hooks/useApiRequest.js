/* eslint-disable no-param-reassign */
import axios from "axios";

const makeRequest = axios.create({
  baseURL: "https://entertablock-backend.vercel.app/api",
  // baseURL: process.env.REACT_APP_ALT_BASE_URL,
  timeout: 1 * 60 * 1000,
});

// REACT_APP_ALT_BASE_URL="http://20.54.227.23/alatchannel/api"

const useApiRequest = () => {
  // Add a request interceptor
  makeRequest.interceptors.request.use(
    async (config) => {
      const userToken = localStorage.getItem("token");
      if (!userToken) return config;

      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
        config.headers["x-auth-token"] = userToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return makeRequest;
};

export default useApiRequest;
