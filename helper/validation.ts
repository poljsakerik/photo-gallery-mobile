export function validateEmail(email: string) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validateEmptyFields(
  validationObject: { [key: string]: string[] },
  params: { [key: string]: string }
) {
  Object.keys(params).forEach((_key) => {
    const key = _key as keyof typeof params;
    if (!params[key]) {
      validationObject[key].push("Please fill out this field");
    }
  });
  return validationObject;
}

export function validatePassword(password: string) {
  return password.length >= 8;
}
