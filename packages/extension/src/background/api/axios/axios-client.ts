import axios, {AxiosRequestConfig} from "axios";
import {Store} from "../../../common/types";

export const axiosBaseUrl = `http://localhost:3000`;
export const axiosConfig: AxiosRequestConfig = {baseURL: axiosBaseUrl,};
export const axiosBackendClient = axios.create(axiosConfig);

let authToken: string | null = null;

async function loadToken(){

  const {token} = await chrome.storage.local.get<Store>('token');

  if (token){
    authToken = token;
  }

}

export const setAuthToken = async (token: string) => {
  await chrome.storage.local.set<Store>({token});
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
loadToken();