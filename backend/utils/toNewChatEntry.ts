import { ChatDocument } from "../types/chat";
import isString from "./isString";

const parseContent = (content: unknown): string => {
  if (!content || !isString(content)) {
    throw new Error("Incorrect or missing chat message");
  }

  return content;
};

const toNewChatEntry = (obj: unknown): ChatDocument => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("content" in obj && "companyId" in obj) {
    const newChat: ChatDocument = {
      content: parseContent(obj.content),
      companyId: obj.companyId as string,
    };

    return newChat;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewChatEntry;
