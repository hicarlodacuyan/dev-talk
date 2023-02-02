import mongoose from 'mongoose';

interface UserDocument extends mongoose.Document {
  username: string;
  name: string;
  passwordHash?: string;
  chats: mongoose.Types.ObjectId[];
}

interface TransformedUserDocument extends UserDocument {
  id: string;
}

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ]
});

userSchema.set('toJSON', {
  transform: (_document, returnedObject: TransformedUserDocument) => {
    returnedObject.id = (
      returnedObject._id as mongoose.Types.ObjectId
    ).toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
