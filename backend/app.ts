import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './utils/config';
import logger from './utils/logger';
import companiesRouter from './routes/companies';

const app = express();
const url = config.MONGODB_URI;

if (url) {
  void connectToDB(url);
} else {
  logger.error('MONGODB_URI is not defined');
}

app.use(cors());
app.use(express.json());

app.use('/api/companies', companiesRouter);

async function connectToDB(url: string) {
  try {
    await mongoose.connect(url);
    logger.info('Connected to DB');
  } catch (error) {
    logger.error('Error connecting to DB', error);
  }
}

export default app;
