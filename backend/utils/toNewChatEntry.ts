import { ChatDocument } from '../types/chat';

function isString(text: unknown): text is string {
  return typeof text === 'string';
}

function parseContent(content: unknown): string {
  if (!content || !isString(content)) {
    throw new Error('Incorrect or missing content');
  }

  return content;
}

function isNumber(num: unknown): num is number {
  return typeof num === 'number';
}

function parseLikes(likes: unknown): number {
  if (!likes || !isNumber(likes)) {
    throw new Error('Incorrect or missing value');
  }

  return likes;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toNewChatEntry(obj: any): ChatDocument {
  const newChat: ChatDocument = {
    content: parseContent(obj.content),
    user: '63db41b3369d4b132071d2b6',
    likes: parseLikes(obj.likes)
  };

  return newChat;
}

export default toNewChatEntry;
