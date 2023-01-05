import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { APIToken, refreshTokenFn } from "./axios";
import getEnvVars from "./consts";

axios.defaults.baseURL = getEnvVars()?.apiUrl;

axios.interceptors.request.use(
  async (config) => {
    const data = await AsyncStorage.getItem("token");
    const token: APIToken = JSON.parse(data!);

    if (token?.access) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token?.access}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result: APIToken | undefined = await refreshTokenFn();

      if (result?.access) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.access}`,
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);

export const axiosPrivate = axios;
