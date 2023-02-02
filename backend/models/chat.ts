import mongoose from 'mongoose';

interface ChatDocument extends mongoose.Document {
  content: string;
  user: mongoose.Types.ObjectId;
  likes: number[];
}

interface TransformedChatDocument extends ChatDocument {
  id: string;
}

const chatSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Array
});

chatSchema.set('toJSON', {
  transform: (_document, returnedObject: TransformedChatDocument) => {
    returnedObject.id = (
      returnedObject._id as mongoose.Types.ObjectId
    ).toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);

export default Chat;
