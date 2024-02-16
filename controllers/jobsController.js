import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";
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
  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  const { status, workType, search, sort } = req.query;
  //condition for searching
  const queryObject = {
    createdBy: req.user.userId,
  };

  //logic for filter
  if (status && status != "all") {
    queryObject.status = status;
  }
  if (workType && workType != "all") {
    queryObject.workType = workType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  let queryResult = jobsModel.find(queryObject);
  //sorting logic
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }
  if (sort === "A-Z") {
    queryResult = queryResult.sort("-position");
  }

  const jobs = await queryResult;

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

export const deleteJobController = async (req, res) => {
  const { id } = req.params;

  //find job
  const job = await jobsModel.findOne({ _id: id });

  //validation
  if (!job) {
    next(`No job found with id ${id}`);
  }

  if (!req.user.userId === job.createdBy.toString()) {
    next("You are not authorized to delete this job");
    return;
  }
  await job.deleteOne();

  res.status(200).json({
    message: "Successfully deleted job",
  });
};

export const bulkInsert = async (req, res) => {
  try {
    const job = await jobsModel.insertMany(req.body);

    // await QuestionBank.deleteMany({});
    res.json({
      success: true,
      message: "jobs added successfully",
      data: job,
      err: {},
    });
  } catch (error) {
    res.json({
      success: false,
      message: "jobs Not added ",
      data: [],
      err: error.message,
    });
  }
};

export const jobStatsController = async (req, res) => {
  const stats = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //monthly yearly stats

  let monthlyApplication = await jobsModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  res.status(200).json({
    totalJobs: stats.length,
    stats,
    monthlyApplication,
  });
};
