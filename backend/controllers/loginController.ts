import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import userCredentials from "../utils/userCredentials";

const login = async (req: Request, res: Response) => {
  const { username, password } = userCredentials(req.body);
  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash as string);

  if (!(user && passwordCorrect)) {
    return res.status(401).send("Invalid username or password");
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET as string);

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name });
};

export default {
  login,
};
