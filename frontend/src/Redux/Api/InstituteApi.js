import axios from "axios";

const BASE_URL = "http://localhost:5000/api/institute";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to add token in headers if exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
