import isString from "./isString";

const parseUsername = (username: unknown): string => {
  if (!username || !isString(username)) {
    throw new Error("Incorrect or missing chat message");
  }

  return username;
};

const parsePassword = (password: unknown): string => {
  if (!password || !isString(password)) {
    throw new Error("Incorrect or missing chat message");
  }

  return password;
};

const userCredentials = (obj: unknown) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("username" in obj && "password" in obj) {
    const user = {
      username: parseUsername(obj.username),
      password: parsePassword(obj.password),
    };

    return user;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default userCredentials;
