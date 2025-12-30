import axios from "axios";
import { getCSRFToken } from "./utils/csrf";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getCSRFToken();
  if (token) {
    config.headers["X-CSRFToken"] = token;
  }
  return config;
});
