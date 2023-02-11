import express from 'express';
import Chat from '../models/chat';
import User from '../models/user';
import Company from '../models/company';

const chatsRouter = express.Router();

chatsRouter.get('/', async (_req, res) => {
  const chats = await Chat.find({}).populate('user', { username: 1, name: 1 });

  res.json(chats);
});

chatsRouter.post('/', async (req, res) => {
  const body = req.body;
  const user: any = await User.findById(body.userId);
  const company: any = await Company.findById(body.companyId);

  const chat = new Chat({
    content: body.content,
    user: user._id,
    company: company._id
  });

  const savedChat = await chat.save();

  user.chats = [...user.chats].concat(savedChat._id);
  await user.save()

  company.chats = [...company.chats].concat(savedChat._id);
  await company.save()
  
  res.json(savedChat);
});

export default chatsRouter;