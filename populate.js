// use the command node populate to run this file

import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

try {
  await mongoose.connect(process.env.MONGO_URI);
  // const user = await User.findOne({ email: "test@test.com" }); for test user
  const user = await User.findOne({ email: "john@gmail.com" }); //for admin

  const jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  // console.log(jobs);
  // console.log(
  //   import.meta.url,
  //   new URL("./utils/mockData.json", import.meta.url)
  // );

  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log("Success!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
