import axios, { AxiosResponse } from "axios";
import { NewUserCredentials, UserCredentials } from "../types/user";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response: AxiosResponse<UserCredentials> = await axios.post(
    "api/login",
    {
      username,
      password,
    }
  );

  localStorage.setItem("loggedInUserToken", JSON.stringify(response.data));

  return response.data;
};

const register = async (newUserCredential: NewUserCredentials) => {
  const response: AxiosResponse<NewUserCredentials> = await axios.post(
    "/api/users",
    newUserCredential
  );

  return response.data;
};

const logout = () => {
  localStorage.removeItem("loggedInUserToken");
};

export default {
  login,
  register,
  logout,
};
