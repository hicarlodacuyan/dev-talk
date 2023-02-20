import { ChatDocument } from "../types/chat";
import parseString from "./parseString";

const toNewChatEntry = (obj: unknown): ChatDocument => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("content" in obj && "companyId" in obj) {
    const newChat: ChatDocument = {
      content: parseString(obj.content),
      companyId: parseString(obj.companyId),
    };

    return newChat;
  }

  throw new Error("Incorrect data: some fields are missing");
};

export default toNewChatEntry;
