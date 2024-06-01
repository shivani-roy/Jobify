import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//public
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// import { body, validationResult } from "express-validator";

const app = express();
const port = process.env.PORT || 5100;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(cookieParser());
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(mongoSanitize());

if (process.env.NODE_DEV === "development") {
  app.use(morgan("dev"));
}

// app.post(
//   "/",
//   [
//     body("name")
//       .notEmpty()
//       .withMessage("provide name")
//       .isLength({ min: 2 })
//       .isAlpha(),
//   ],
//   (req, res, next) => {
//     const errors = validationResult(req);
//     console.log(errors);

//     if (!errors.isEmpty()) {
//       const errorMessages = errors.array().map((err) => err.msg);
//       console.log(errorMessages);

//       return res.status(400).json({ msg: errorMessages });
//     }
//     next();
//   },
//   (req, res) => {
//     const { name } = req.body;
//     res.json({ msg: `hello ${name}` });
//   }
// );

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "route not found" });
});

app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.MONGO_URI);

  app.listen(port, () => {
    console.log(`server is listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
