import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: [true, "Name is required"],
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    require: [true, "Password is Required"],
    minLength: [6, "Length should be greater than 6"],
  },
  location: {
    type: String,
  },
});

export default mongoose.model("user", userSchema);
