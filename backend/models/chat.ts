import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    content: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

chatSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = (
      returnedObject._id as mongoose.Types.ObjectId
    ).toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
