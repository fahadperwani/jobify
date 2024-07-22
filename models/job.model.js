import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Job Title is required"],
  },
  description: {
    type: String,
    required: [true, "Job Description is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  company: {
    type: String,
    ref: "Company",
    required: true,
  },
  salary: {
    type: Number,
    required: [true, "Salary is required"],
  },
});

export const Job = mongoose.model("Job", jobSchema);
