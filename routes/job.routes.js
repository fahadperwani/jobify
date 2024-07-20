import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerJob, updateJob } from "../controllers/job.controller.js";

const jobRouter = Router();

jobRouter.post("/register", verifyJWT, registerJob);

jobRouter.put("/update", verifyJWT, updateJob);

jobRouter.delete("/update", verifyJWT, updateJob);

export default jobRouter;
