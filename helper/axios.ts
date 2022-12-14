import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  removeLoginTokens,
  setLoginTokens,
} from "../screens/login/helper/helper";

export type APIToken = {
  access: string;
  refresh: string;
};

export const axiosPublic = axios.create({
  baseURL: "http://vm-19.lrk.si:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function refreshTokenFn() {
  const data = await AsyncStorage.getItem("token");
  if (data) {
    try {
      const token: APIToken = JSON.parse(data);

      const response: APIToken = await axiosPublic.post(
        "/account/api/token/refresh/",
        {
          refresh: token?.refresh,
        }
      );

      if (!response?.access) {
        removeLoginTokens();
      }

      setLoginTokens(response);

      return response;
    } catch (error) {
      removeLoginTokens();
    }
  } else {
    return undefined;
  }
}
