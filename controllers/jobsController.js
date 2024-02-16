import jobsModel from "../models/jobsModel.js";

//*******create jobs****** */
export const createJobController = async (req, res, next) => {
  const { company, position } = req.body;

  if (!company || !position) {
    next("Please provide all field");
  }
  req.body.createdBy = req.user.userId;
  const job = await jobsModel.create(req.body);

  res.status(200).json({ job });
};
/********Get  Jobs***** */
export const getJobsController = async (req, res, next) => {
  const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalJobs: jobs.length,
    jobs,
  });
};
