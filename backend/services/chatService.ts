import Chat from '../models/chat';
import { ChatDocument } from '../types/chat';

async function getChats() {
  const chats = await Chat.find({});

  return chats;
}

async function addChat({ content, user, likes }: ChatDocument) {
  const chat = await Chat.create({
    content,
    user,
    likes
  });

  return chat;
}

export default {
  getChats,
  addChat
};
