import bcrypt from 'bcryptjs';
import express from 'express';
import User from '../models/user';

const usersRouter = express.Router();

usersRouter.get('/', async (_req, res) => {
  const users = await User.find({}).populate('chats', { content: 1, company: 1 });

  res.json(users);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

export default usersRouter;