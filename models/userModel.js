import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";

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

//hashing password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
//JWT Token
userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, JWT_SECRET, { expiresIn: "1d" });
};

export default mongoose.model("user", userSchema);
