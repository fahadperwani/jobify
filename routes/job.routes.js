import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  deleteJob,
  registerJob,
  updateJob,
} from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.post("/register", verifyJWT, registerJob);

jobRouter.put("/update", verifyJWT, updateJob);

jobRouter.delete("/delete", verifyJWT, deleteJob);

export default jobRouter;
