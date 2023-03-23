import axios, { AxiosResponse } from "axios";

interface Company {
  id: string;
  description: string;
  likes: number;
  user?: string;
  chats?: [];
}

const getCompanies = async () => {
  const response: AxiosResponse<Company[]> = await axios.get("/api/companies");

  return response.data;
};

export default {
  getCompanies,
};
