import Chat from '../models/chat';
import { ChatDocument } from '../types/chat';

async function getChats() {
  const chats = await Chat.find({});

  return chats;
}

async function getChat(id: string) {
  const chat = await Chat.findById(id);

  return chat;
}

async function addChat({ content, user, likes }: ChatDocument) {
  const chat = await Chat.create({
    content,
    user,
    likes
  });

  return chat;
}

async function deleteChat(id: string) {
  const chat = await Chat.findByIdAndRemove(id);
  
  return chat;
}

export default {
  getChats,
  getChat,
  addChat,
  deleteChat
};
