import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import config from "./utils/config";
import logger from "./utils/logger";
import loginRouter from "./controllers/login";
import chatsRouter from "./controllers/chats";
import usersRouter from "./controllers/users";
import companiesRouter from "./controllers/companies";
import errorHandler from "./middlewares/errorHandler";

const app = express();
const url = config.MONGODB_URI;
const connectToDB = async (url: string): Promise<void> => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(url);
  logger.info("Connected to DB");
};

url ? void connectToDB(url) : logger.error("Error connecting to DB");

app.use(cors());
app.use(express.json());
app.use("/api/login", loginRouter);
app.use("/api/chats", chatsRouter);
app.use("/api/users", usersRouter);
app.use("/api/companies", companiesRouter);
app.use(errorHandler);

export default app;
