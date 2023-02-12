import { Chat } from "./chat";

export interface CompanyDocument {
  description: string;
  likes?: number;
  chats?: Array<Chat>;
}

export interface TransformedCompanyDocument extends CompanyDocument {
  id: string;
}
