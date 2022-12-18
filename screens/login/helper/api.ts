import { axiosPublic } from "../../../helper/axios";
import { LoginParams } from "./helper";

export async function loginUser(params: LoginParams) {
  return axiosPublic.post("/account/api/token/", params);
}
