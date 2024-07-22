import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Assuming you have Axios installed
import { axiosInstance } from "../utils/axios";

const JobForm = () => {
  const l = useLocation();
  const [title, setTitle] = useState(l.state?.initialData?.title || "");
  const [description, setDescription] = useState(
    l.state?.initialData?.description || ""
  );
  const [location, setLocation] = useState(
    l.state?.initialData?.location || ""
  );
  const [salary, setSalary] = useState(l.state?.initialData?.salary || 0); // Assuming salary is a number
  const [companyName, setCompanyName] = useState(
    l.state?.initialData?.companyName || ""
  );

  const { jobId } = useParams(); // Get job ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    // No need for API call if initial data is provided through props
  }, []); // Empty dependency array to prevent unnecessary effect runs

  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobData = { title, description, location, salary, companyName };

    try {
      const response = jobId
        ? await axiosInstance.put(`/api/job/update`, {
            ...jobData,
            _id: jobId,
          }) // Update job
        : await axiosInstance.post("/api/job/register", jobData); // Add new job

      if (response.data.success) {
        alert(jobId ? "Job updated successfully" : "Job added successfully");
        navigate("/", { replace: true }); // Redirect to jobs list after success
      }
    } catch (error) {
      console.error(error);
      // Handle errors appropriately (e.g., display error message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="min-w-96 p-20 bg-white rounded-md shadow-md"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Job Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Job Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="salary"
            className="block text-sm font-medium text-gray-700"
          >
            Salary
          </label>
          <input
            type="number" // Use type="number" for salary
            id="salary"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(event) => setCompanyName(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {jobId ? "Update Job" : "Add Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
