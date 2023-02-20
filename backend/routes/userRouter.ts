import express from "express";
import userController from "../controllers/userController";

const usersRouter = express.Router();

usersRouter.get("/", userController.getUsers);
usersRouter.post("/", userController.createUser);

export default usersRouter;
