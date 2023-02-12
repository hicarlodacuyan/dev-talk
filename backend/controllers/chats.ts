import express from "express";
import jwt from "jsonwebtoken";
import Chat from "../models/chat";
import User from "../models/user";
import Company from "../models/company";
import getTokenFrom from "../utils/getTokenFrom";
import config from "../utils/config";

interface JwtPayload {
  id: string;
}

const chatsRouter = express.Router();

chatsRouter.get("/", async (_req, res) => {
  const chats = await Chat.find({}).populate("user", { username: 1, name: 1 });

  res.json(chats);
});

chatsRouter.post("/", async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  if (!config.SECRET) {
    return res.status(500).json({ error: "secret missing" });
  }

  const decodedToken = jwt.verify(token, config.SECRET) as JwtPayload;

  if (!decodedToken.id) {
    return res.status(401).json({ error: "token invalid" });
  }

  const user: any = await User.findById(decodedToken.id);

  const company: any = await Company.findById(body.companyId);

  const chat = new Chat({
    content: body.content,
    user: user._id,
    company: company._id,
  });

  const savedChat = await chat.save();

  user.chats = [...user.chats].concat(savedChat._id);
  await user.save();

  company.chats = [...company.chats].concat(savedChat._id);
  await company.save();

  return res.json(savedChat);
});

export default chatsRouter;
