import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ]
});

companySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = (
      returnedObject._id as mongoose.Types.ObjectId
    ).toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Company = mongoose.model('company', companySchema);

export default Company;
