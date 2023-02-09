import Chat from '../models/chat';
import User from '../models/user';
import Company from '../models/company';

async function addChat(message: any) {
  const chat = new Chat({
    content: message.content,
    user: message.user,
    company: message.company
  });

  const user: any = await User.findById(message.user);
  const company: any = await Company.findById(message.company);
  
  const savedChat = await chat.save();
  user.chats = [...user.chats].concat(savedChat._id);
  company.chats = [...company.chats].concat(savedChat._id);
  await user.save()
  await company.save()

  return savedChat;
} 

export default {
  addChat
};