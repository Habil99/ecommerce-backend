export const INVALID_AUTH_CREDENTIALS =
  "Email or Password is incorrect, please provide valid credentials";

export const RUNTIME_EXCEPTION = "Something went wrong, please try again later";

export const USER_ALREADY_EXISTS = "User already exists with provided email";

export const USER_NOT_FOUND = (value: string | number) =>
  `User not found with provided ${value}`;

export const INVALID_TOKEN = "Invalid token";

export const OTP_NOT_FOUND = "OTP code not found to confirm email";

export const OTP_EXPIRED = "OTP code expired, please request new one";

export const INVALID_OTP = "Invalid OTP code, please provide valid one";

export const EMAIL_CONFIRMED = "Email confirmed successfully";

export const USER_NOT_ACTIVE = "Account is not active, please contact support";

export const USER_NOT_CONFIRMED_EMAIL = "Please confirm your email first";
