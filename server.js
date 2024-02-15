//packages imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
//file imports
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/db.js";
dotenv.config();
import authRoute from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
//mongo db connection
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoute);

//validation middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`.rainbow);
  connectDB();
});
