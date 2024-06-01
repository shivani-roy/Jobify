import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
// import { promises as fs } from "fs";
import { formatImage } from "../middleware/multerMiddleware.js";

const getCurrentUser = async (req, res) => {
  // const user = await User.findOne({ _id: req.user.userId }).select('-password');
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();

  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ jobs, users });
};

const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const file= formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    // console.log(response);
    // await fs.unlink(req.file.path); //remove image from ./public/uploads
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser); //it returns the user before update

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId); //delete the previous image from cloudinary
  }

  res.status(StatusCodes.OK).json({ msg: "user updated" });
};

export { getCurrentUser, getApplicationStats, updateUser };
