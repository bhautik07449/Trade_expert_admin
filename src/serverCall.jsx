import axios from "axios";
import config from "./config";

const BASE_URL = config.baseApi;

const customAxios = axios.create({
  baseURL: BASE_URL,
});

const requestHandler = (request) => {
  const user = localStorage.getItem("token");

  if (user && !request.url?.includes('/auth/login')) {
    const token = user;
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 500) {
    console.error("Server error 500");
  }
  return response;
};

const requestErrorHandler = (error) => {
  return Promise.reject(error);
};

const responseErrorHandler = (error) => {
  if (error.response) {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if ((error.response.status === 401 || error.response.status === 403) && !isLoginRequest) {
      localStorage.clear();
      window.location.replace("/login");
    }
  }
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => requestErrorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  responseErrorHandler
);

export default customAxios;
