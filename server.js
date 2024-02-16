//packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
//security package
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { rateLimit } from "express-rate-limit";

//file imports
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/db.js";
dotenv.config();
import errorMiddleware from "./middlewares/errorMiddleware.js";
//routes import
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import jobsRoute from "./routes/jobsRoutes.js";

//mongo db connection
const app = express();

//middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobsRoute);

//validation middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.rainbow);
  connectDB();
});
