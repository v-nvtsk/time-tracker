import axios, {AxiosRequestConfig} from "axios";

export const axiosBaseUrl = `http://localhost:3000`;
export const axiosConfig: AxiosRequestConfig = {baseURL: axiosBaseUrl,};
export const axiosBackendClient = axios.create(axiosConfig);

let authToken: string | null = localStorage.getItem('token');

export const setAuthToken = (token: string | null) => {
  localStorage.setItem('token', token || '');
  authToken = token;
};
axiosBackendClient.interceptors.response.use(
  (config) => {
    if (config.data.token) {
      setAuthToken(config.data.token);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
axiosBackendClient.interceptors.request.use(
  (config) => {
    if (authToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);