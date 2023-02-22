import axios, { AxiosResponse } from "axios";
import { UserCredentials } from "../types/user";
const baseUrl = "/api/login";

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response: AxiosResponse<UserCredentials> = await axios.post(baseUrl, {
    username,
    password,
  });

  return response.data;
};

export default {
  login,
};
