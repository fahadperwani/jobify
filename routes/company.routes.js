import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerCompany } from "../controllers/company.controller.js";

const companyRouter = Router();

companyRouter.post("/register", verifyJWT, registerCompany);

export default companyRouter;
