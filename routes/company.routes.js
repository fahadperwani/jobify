import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getCompaniesWithJobs,
  registerCompany,
} from "../controllers/company.controller.js";

const companyRouter = Router();

companyRouter.post("/register", verifyJWT, registerCompany);

companyRouter.get("/getCompaniesWithJobs", verifyJWT, getCompaniesWithJobs);

export default companyRouter;
