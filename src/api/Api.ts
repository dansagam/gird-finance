import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_RATE_BASE_URL || "",
});

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    return config;
  },
  (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response) => {
    if (response.status === 208) {
      throw response;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default Api;
