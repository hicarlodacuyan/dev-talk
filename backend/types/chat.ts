export interface ChatDocument {
  content: string;
  user: string;
  likes: number;
}

export interface TransformedChatDocument extends ChatDocument {
  id: string;
}
