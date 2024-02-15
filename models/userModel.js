import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
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

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("user", userSchema);
