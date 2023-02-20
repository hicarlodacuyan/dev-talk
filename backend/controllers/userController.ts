import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import toNewUserEntry from "../utils/toNewUserEntry";

const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find({}).populate("chats");

  res.json(users);
};

const createUser = async (req: Request, res: Response) => {
  const { username, name, password } = toNewUserEntry(req.body);

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
};

export default {
  getUsers,
  createUser,
};
