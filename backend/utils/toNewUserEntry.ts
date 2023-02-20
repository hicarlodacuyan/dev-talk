import parseString from "./parseString";

const userCredentials = (obj: unknown) => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("username" in obj && "name" in obj && "password" in obj) {
    const user = {
      username: parseString(obj.username),
      name: parseString(obj.name),
      password: parseString(obj.password),
    };

    return user;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default userCredentials;
