import { axiosPublic } from "../../../helper/axios";

export type RegisterParams = {
  email: string;
  username: string;
  password: string;
  password2: string;
};

export async function registerUser(params: RegisterParams) {
  return axiosPublic.post("/account/register/", params);
}
