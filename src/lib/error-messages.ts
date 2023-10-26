export const INVALID_AUTH_CREDENTIALS =
  "Email or Password is incorrect, please provide valid credentials";

export const RUNTIME_EXCEPTION = "Something went wrong, please try again later";

export const USER_ALREADY_EXISTS = "User already exists with provided email";

export const USER_NOT_FOUND = (value: string | number) =>
  `User not found with provided ${value}`;
