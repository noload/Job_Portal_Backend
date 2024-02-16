import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, "Company name is required"],
    },
    position: {
      type: String,
      require: [true, "Position is required"],
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
      default: "pending",
    },
    workType: {
      type: String,
      enum: ["full time", "part time", "internship", "contract"],
      default: "full time",
    },
    workLocation: {
      type: "String",
      default: "mumbai",
      require: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("job", jobSchema);
