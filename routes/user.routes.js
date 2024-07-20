import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/login", login);

userRouter.post("/logout", verifyJWT, logout);

userRouter.post("/refreshAccessToken", refreshAccessToken);

export default userRouter;
