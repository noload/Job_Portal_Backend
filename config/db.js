import mongoose from "mongoose";
import colors from "colors";
import { DB_URL } from "./serverConfig.js";

const connectDB = async () => {
  try {
    mongoose.connect(DB_URL);
    console.log(`connected to MongoDB Database`.blue);
  } catch (error) {
    console.log(`mongo erroor ${error}`.red);
  }
};

export default connectDB;
