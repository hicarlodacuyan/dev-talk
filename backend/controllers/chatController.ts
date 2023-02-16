import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Chat from "../models/chat";
import User from "../models/user";
import Company from "../models/company";
import getTokenFrom from "../utils/getTokenFrom";
import config from "../utils/config";
import toNewChatEntry from "../utils/toNewChatEntry";
import { ChatDocument } from "../types/chat";

interface JwtPayload {
  id: string;
}

const getChats = async (_req: Request, res: Response): Promise<void> => {
  const chats = await Chat.find({}).populate("user", { username: 1, name: 1 });

  res.json(chats);
};

const createChat = async (req: Request, res: Response): Promise<Response> => {
  const newChatEntry: ChatDocument = toNewChatEntry(req.body);
  const token = getTokenFrom(req);

  if (!config.SECRET) {
    return res.status(500).json({ error: "secret missing" });
  }

  const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload;

  const [user, company] = await Promise.all([
    User.findById(decodedToken.id),
    Company.findById(newChatEntry.companyId),
  ]);

  if (!user || !company) {
    return res.status(401).json({ error: "Incorrect data" });
  }

  const chat = new Chat({
    content: newChatEntry.content,
    user: user._id,
    company: company._id,
  });

  const savedChat = await chat.save();

  user.chats = [...user.chats].concat(savedChat._id);
  await user.save();

  company.chats = [...company.chats].concat(savedChat._id);
  await company.save();

  return res.json(savedChat);
};

export default {
  getChats,
  createChat,
};
