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

/****Update Jobs*** */
export const updateJobController = async (req, res, next) => {
  const { id } = req.params;
  const { company, position } = req.body;

  //Validation
  if (!company || !position) {
    next("Please Enter All Field");
  }

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No job found with id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not Authorized to update this job");
    return;
  }
  const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({ updateJob });
};
