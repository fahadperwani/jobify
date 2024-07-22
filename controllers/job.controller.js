import mongoose, { Mongoose } from "mongoose";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

export const registerJob = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res
        .status(404)
        .send({ success: false, message: "Only an admin can add a job" });
    const { title, description, location, companyName, salary } = req.body;
    console.log(req.body);

    const company = await Company.findOne({ name: companyName });

    if (!company)
      res.status(404).json({ success: false, message: "Company Not found" });

    const job = new Job({
      title,
      description,
      location,
      company: company.name,
      salary,
    });

    await job.save();

    res.status(200).json({
      success: true,
      data: job,
      message: "Job Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res
        .status(404)
        .send({ success: false, message: "Only an admin can update a job" });
    const { _id, title, description, location, companyName, salary } = req.body;

    const job = await Job.findById(_id);

    if (!job)
      res.status(404).json({ success: false, message: "Job Not found" });

    const company = await Company.findOne({ name: companyName });

    if (!company)
      res.status(404).json({ success: false, message: "Company Not found" });

    job.title = title;
    job.description = description;
    job.location = location;
    job.company = company.name;
    job.salary = salary;

    await job.save();

    res
      .status(200)
      .json({ success: true, data: job, message: "Job Updated Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    if (!req.user?.isAdmin)
      return res
        .status(404)
        .send({ success: false, message: "Only an admin can delete a job" });
    console.log(req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job)
      return res.status(404).send({ success: false, message: "Job not found" });

    return res
      .status(200)
      .send({ success: true, data: job, message: "Job deleted Successfully" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
};
