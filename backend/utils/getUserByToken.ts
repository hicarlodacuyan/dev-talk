import jwt from "jsonwebtoken";
import User from "../models/user";
import config from "./config";

interface JwtPayload {
  id: string;
}

const getUserByToken = async (token: string) => {
  if (!config.SECRET) {
    throw new Error("JWT SECRET is missing");
  }

  const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload;
  const user = await User.findById(decodedToken.id);

  if (!user) throw new Error("User not found");

  return user;
};

export default getUserByToken;
