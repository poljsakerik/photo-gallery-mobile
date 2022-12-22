import {
  validateEmail,
  validateEmptyFields,
  validatePassword,
} from "../../../helper/validation";
import { RegisterParams } from "./api";

export function validateRegisterInput(params: RegisterParams) {
  const validationObject = {
    email: [] as string[],
    username: [] as string[],
    password: [] as string[],
    password2: [] as string[],
  };
  validateEmptyFields(validationObject, params);
  if (!validateEmail(params.email)) {
    validationObject.email.push("Please enter a valid email");
  }
  if (!validatePassword(params.password)) {
    validationObject.password.push(
      "The password is too short. Please Enter at least 8 characters"
    );
  }
  if (params.password !== params.password2) {
    validationObject.password.push("Passwords don't match");
    validationObject.password2.push("Passwords don't match");
  }
  return validationObject;
}
