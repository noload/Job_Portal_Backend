import mongoose from "mongoose";
import colors from "colors";
import { DB_URL } from "./serverConfig.js";

const connectDB = async () => {
  try {
    mongoose.connect(DB_URL);
  } catch (error) {}
};

export default connectDB;
