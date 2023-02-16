import express from "express";
import chatController from "../controllers/chatController";

const chatsRouter = express.Router();

chatsRouter.get("/", chatController.getChats);
chatsRouter.post("/", chatController.createChat);

export default chatsRouter;
