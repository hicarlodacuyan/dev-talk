import { ChatDocument } from "./chat";

export interface CompanyDocument {
  description: string;
  likes?: number;
  chats?: Array<ChatDocument>;
}

export interface TransformedCompanyDocument extends CompanyDocument {
  id: string;
}
