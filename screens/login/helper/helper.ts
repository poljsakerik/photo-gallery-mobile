import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { JWTUser } from "../../../components/AuthContext";
import { APIToken } from "../../../helper/axios";
import {
  validateEmptyFields,
  validatePassword,
} from "../../../helper/validation";

export type LoginParams = {
  username: string;
  password: string;
};

export function validateLogin(params: LoginParams) {
  const validationObject = {
    username: [] as string[],
    password: [] as string[],
  };
  validateEmptyFields(validationObject, params);
  if (!validatePassword(params.password)) {
    validationObject.password.push(
      "The password is too short. Please Enter at least 8 characters"
    );
  }
  return validationObject;
}

export async function setLoginTokens(token: APIToken) {
  await AsyncStorage.setItem("token", JSON.stringify(token));
  const decoded: JWTUser = jwtDecode(token.access);
  await AsyncStorage.setItem("user", JSON.stringify(decoded));
  return decoded;
}

export async function removeLoginTokens() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}
