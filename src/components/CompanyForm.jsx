import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you have Axios installed
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const [name, setName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform basic validation (optional)
    if (!name || !contactEmail || !address) {
      console.error("Please fill in all required fields.");
      return; // Prevent submission if validation fails
    }

    try {
      //   const response = await axios.post(
      //     isAdding ? "/api/companies" : `/api/companies/${initialData.id}`, // Adjust URL based on your backend
      //     { name, contactEmail, address }
      //   );
      const response = await axiosInstance.post("/api/company/register", {
        name,
        contactEmail,
        address,
      });
      console.log(response.data);
      if (response.data.success) {
        alert("Company added successfully");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      // Handle errors appropriately (e.g., display error message to user)
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
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Company Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Email
          </label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            name="address"
            id="address"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required // Add required attribute
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
