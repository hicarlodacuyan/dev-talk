import mongoose from 'mongoose';

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
  transform: (_document, returnedObject) => {
    returnedObject.id = (
      returnedObject._id as mongoose.Types.ObjectId
    ).toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
