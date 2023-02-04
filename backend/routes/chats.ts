import express from 'express';
import chatService from '../services/chatService';
import toNewChatEntry from '../utils/toNewChatEntry';

const chatsRouter = express.Router();

chatsRouter.get('/', async (_req, res) => {
  try {
    const chats = await chatService.getChats();
    res.send(chats);
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

chatsRouter.get('/:id', async (req, res) => {
  try {
    const { id }: { id: string } = req.params;
    const chat = await chatService.getChat(id);
    
    if (chat === null) {
      res.status(404).send({ error: 'Resource not found' });
    }

    res.json(chat);
  } catch (error) {
    res.status(500).send({ error });
  }
});

chatsRouter.post('/', async (req, res) => {
  try {
    const newChatEntry = toNewChatEntry(req.body);
    const addedChat = await chatService.addChat(newChatEntry);
    res.json(addedChat);
  } catch (error) {
    res.status(400).send({ error });
  }
});

chatsRouter.delete('/:id', async (req, res) => {
  try {
    const id: string = req.params.id;
    const deletedChat = await chatService.deleteChat(id);

    if (deletedChat === null) {
      res.status(404).send({ error: 'Resource not found' });
    }

    res.json(deletedChat);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default chatsRouter;
