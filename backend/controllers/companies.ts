import express from 'express';
import jwt from 'jsonwebtoken';
import Company from '../models/company';
import User from '../models/user';
import getTokenFrom from '../utils/getTokenFrom';

interface JwtPayload {
  id: string
}

const companiesRouter = express.Router();

companiesRouter.get('/', async (_req, res) => {
  const companies = await Company.find({}).populate({
    path: 'chats',
    select: 'content createdAt',
    populate: {
      path: 'user',
      select: 'username name'
    }
  });

  res.json(companies);
});

companiesRouter.get('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);

  res.json(company);
});

companiesRouter.post('/', async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);

  if (!token) {
    return res.status(401).json({ error: 'token missing' });
  }

  if (!process.env.SECRET) {
    return res.status(500).json({ error: 'secret missing' });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET) as JwtPayload;
  
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const user: any = await User.findById(decodedToken.id);

  const company = new Company({
    description: body.description,
    user: user._id,
    likes: body.likes
  });
  const savedCompany = await company.save();
  
  return res.status(201).json(savedCompany);
});

companiesRouter.put('/:id', async (req, res) => {
  const body = req.body;
  const company = {
    description: body.description,
    user: body.user,
    likes: body.likes
  };
  const updatedCompany = await Company.findByIdAndUpdate(req.params.id, company, { new: true });

  res.json(updatedCompany);
});

companiesRouter.delete('/:id', async (req, res) => {
  await Company.findByIdAndRemove(req.params.id);

  res.status(204).end();
});

export default companiesRouter;
