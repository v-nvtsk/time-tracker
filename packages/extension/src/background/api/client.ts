/* eslint-disable no-undefined */
import {AxiosInstance} from "axios";
import {
  axiosBackendClient, axiosBaseUrl
} from "./axios/axios-client";
import {
  ActivityApi,
  AuthApi,
  CategoriesApi,
  Configuration
} from "./generated";

const ApiJSONConfig = {
  basePath: axiosBaseUrl,
  isJsonMime: () => true
};
const apiCLientArgs:[Configuration, string | undefined, AxiosInstance] = [ApiJSONConfig, undefined, axiosBackendClient];

export const authApi = new AuthApi(...apiCLientArgs);
export const activityApi = new ActivityApi(...apiCLientArgs);
export const categoryApi = new CategoriesApi(...apiCLientArgs);
