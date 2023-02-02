import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './utils/config';

const app = express();
const url = config.MONGODB_URI;

if (url) {
  void connectToDB(url);
} else {
  console.error('MONGODB_URI is not defined');
}

app.use(cors());
app.use(express.json());

async function connectToDB(url: string) {
  try {
    await mongoose.connect(url);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB', error);
  }
}

export default app;
