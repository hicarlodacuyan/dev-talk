import express from 'express';
import chatService from '../services/chatService';

const chatsRouter = express.Router();

chatsRouter.post('/', async (req, res) => {
  const addedChat = await chatService.addChat(req.body);
  
  res.json(addedChat);
});

export default chatsRouter;