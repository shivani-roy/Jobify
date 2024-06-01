import Job from "../models/JobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import day from "dayjs";

const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;
  console.log(req.query);

  const queryObject = { createdBy: req.user.userId };

  if (search) {
    queryObject.$or = [
      { company: { $regex: search, $options: "i" } },
      { position: { $regex: search, $options: "i" } },
    ];
  }

  if (jobStatus && jobStatus !== "all") {
    queryObject.jobStatus = jobStatus;
  }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  };

  const sortKey = sortOptions[sort] || sortOptions.newest;

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // console.log(queryObject);
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs });
};

const getjob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob });
};

const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: "job deleted", job: removedJob });
};

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    // jobs for the current user
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

    // groups based on jobStatus
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  // console.log(stats, stats.length);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    // jobs of the current user
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },

    // groups based on the year and month
    {
      $group: {
        // pulls out year and month from createdAt
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },

        // count of each group
        count: { $sum: 1 },
      },
    },

    // sorts in descending order (most recent first)
    { $sort: { "_id.year": -1, "_id.month": -1 } },

    // limits to last 6 months
    { $limit: 6 },
  ]);

  // console.log(monthlyApplications, monthlyApplications.length);

  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;

    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY");
    // console.log(date);

    return { date, count };
  });

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, getjob, createJob, updateJob, deleteJob, showStats };
