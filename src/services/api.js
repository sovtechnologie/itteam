import axios from "axios";
import API_BASE_URL from "./config";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Agar authentication tokens use kar rahe ho
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken"); // Or wherever your token is stored
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Typical Bearer token format
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
