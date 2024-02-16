import { Router } from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  getJobsController,
} from "../controllers/jobsController.js";

const router = Router();
//create jobs
router.post("/create-job", userAuth, createJobController);

//get jobs
router.get("/get-jobs", userAuth, getJobsController);
export default router;
