import mongoose from "mongoose";
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res
        .status(400)
        .send({ success: false, message: "Only an admin can add a Company" });
    console.log(req.body);
    const { name, contactEmail, address } = req.body;

    const company = new Company({
      name,
      contactEmail,
      address,
      createdBy: new mongoose.Types.ObjectId(req.user._id),
    });

    await company.save();

    return res
      .status(200)
      .json({ success: true, data: company, message: "New Company Created" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: error.message || "Invalid Details" });
  }
};

export const getCompaniesWithJobs = async (req, res) => {
  try {
    const companies = await Company.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "name",
          foreignField: "company",
          as: "jobs",
        },
      },
    ]);

    return res.status(200).json({ success: true, data: companies });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};
