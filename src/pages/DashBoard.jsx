import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState({});
  const [jobPage, setJobPage] = useState({});
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/company/getCompaniesWithJobs", { withCredentials: true })
      .then((res) => {
        if (res.data.success) setCompanies(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleExpand = (companyId) => {
    console.log("companyId: ", companyId);
    setJobPage(1);
    setExpanded((prev) => {
      const newExpanded = { ...prev };
      Object.keys(newExpanded).forEach((key) => {
        if (key !== companyId) {
          console.log("key", key);
          newExpanded[key] = false;
        }
      });
      newExpanded[companyId] = true;
      console.log(newExpanded[companyId]);
      return newExpanded;
    });
  };

  const handleShrink = (companyId) => {
    setJobPage(1);
    setExpanded((prev) => {
      const newExpanded = { ...prev };
      newExpanded[companyId] = false;
      return newExpanded;
    });
  };

  const handleJobPageChange = (page) => {
    setJobPage(page);
  };

  const handleEdit = (job) => {
    console.log("job", job);
    navigate("/job/update/" + job._id, {
      state: {
        initialData: {
          title: job.title,
          companyName: job.company,
          location: job.location,
          salary: job.salary,
          description: job.description,
        },
      },
    });
  };

  const handleDelete = async (companyId, jobId) => {
    console.log("first", jobId);
    const res = await axiosInstance.delete("/api/job/delete/" + jobId);
    if (res.data.success) {
      alert("Job has been deleted");
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === companyId
            ? {
                ...company,
                jobs: company.jobs.filter((job) => job._id !== jobId),
              }
            : company
        )
      );
    }
  };

  const currentPageCompanies = companies.slice(
    (currentPage - 1) * 5,
    currentPage * 5
  );

  return (
    <div className="p-4">
      <div className="text-3xl font-bold">Dashboard</div>
      <div className="flex flex-col mt-4">
        {currentPageCompanies.map((company) => (
          <div key={company._id} className="p-4 rounded-lg shadow-md mb-4">
            <div className="flex flex-col gap-2 relative">
              <div className="text-lg font-bold">{company.name}</div>
              <div className="text-md">Address: {company.address}</div>
              <div className="text-md">Contact: {company.contactEmail}</div>
              {
                <button
                  onClick={() =>
                    expanded[company._id]
                      ? handleShrink(company._id)
                      : handleExpand(company._id)
                  }
                  className="text-indigo-500 hover:text-indigo-800 absolute top-2 right-10"
                >
                  {expanded[company._id] ? (
                    <IoIosArrowUp size={24} />
                  ) : (
                    <IoIosArrowDown size={24} />
                  )}
                </button>
              }
            </div>
            {expanded[company._id] && (
              <>
                <div className="mt-4">
                  <hr />

                  <div className="text-xl font-bold text-center">Job</div>
                  {company.jobs[jobPage - 1] ? (
                    <>
                      <div className="text-lg font-bold">
                        {company.jobs[jobPage - 1]?.title}
                      </div>
                      <div className="text-md">
                        {company.jobs[jobPage - 1]?.description}
                      </div>
                      <div className="text-md">
                        Salary: {company.jobs[jobPage - 1]?.salary}
                      </div>
                      <div className="text-md">
                        Location: {company.jobs[jobPage - 1]?.location}
                      </div>
                      <div className="mt-4 flex justify-center gap-10">
                        <button
                          onClick={() => handleEdit(company.jobs[jobPage - 1])}
                          className=" mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Edit Job
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(
                              company._id,
                              company.jobs[jobPage - 1]?._id
                            )
                          }
                          className=" mt-3 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Delete Job
                        </button>
                      </div>
                      <div className="flex justify-center gap-4 mt-4">
                        {[...Array(company.jobs.length)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => handleJobPageChange(index + 1)}
                            className={`${
                              index + 1 == jobPage
                                ? "bg-orange-500 hover:bg-orange-800"
                                : "bg-indigo-500 hover:bg-indigo-800"
                            }  text-white px-4 py-2 rounded-lg`}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-lg text-center">No jobs available</div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-4">
        {companies.length > 5 &&
          [...Array(Math.ceil(companies.length / 5))].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`${
                index + 1 == currentPage
                  ? "bg-orange-500 hover:bg-orange-800"
                  : "bg-indigo-500 hover:bg-indigo-800"
              }  text-white px-4 py-2 rounded-lg`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
