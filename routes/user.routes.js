import { Router } from "express";
import { login } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/login", login);

export default userRouter;
