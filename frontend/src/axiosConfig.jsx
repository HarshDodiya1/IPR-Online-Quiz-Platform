import axios from "axios";
import config from "./config";

const instance = axios.create({
  baseURL: config.NODE_ENV === "production" ? config.PROD_API_URL : config.LOCAL_API_URL,
  withCredentials: true,
  timeout: 30000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 404) {
      // Handle 404 errors
      console.error("Resource not found");
      // You can redirect to a 404 page or handle it as needed
    }
    return Promise.reject(error);
  }
);

export default instance;
