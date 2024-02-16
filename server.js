//packages imports
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";
//security package
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
//swagger import
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerConfig.js";

//file imports
import { PORT } from "./config/serverConfig.js";
import connectDB from "./config/db.js";
dotenv.config();
import errorMiddleware from "./middlewares/errorMiddleware.js";
//routes import
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import jobsRoute from "./routes/jobsRoutes.js";

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome to Job Portal");
});
//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
  connectDB();
});
