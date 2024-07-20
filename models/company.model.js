import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Company Name is required"],
  },
  address: { type: String, required: [true, "Company address is required"] },
  contactEmail: {
    type: String,
    required: [true, "Company email address is required"],
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Company = mongoose.model("Company", companySchema);
