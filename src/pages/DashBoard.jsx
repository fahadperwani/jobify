import React, { useState, useEffect } from "react";
import { IoArrowDownOutline, IoArrowUpOutline } from "react-icons/io5";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState({});
  const [jobPage, setJobPage] = useState({});
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const companiesData = [
      {
        id: 1,
        name: "Company 1",
        jobs: [
          { id: 1, title: "Job 1" },
          { id: 2, title: "Job 2" },
        ],
      },
      {
        id: 2,
        name: "Company 2",
        jobs: [
          { id: 3, title: "Job 3" },
          { id: 4, title: "Job 4" },
        ],
      },
      {
        id: 3,
        name: "Company 3",
        jobs: [
          { id: 5, title: "Job 5" },
          { id: 6, title: "Job 6" },
        ],
      },
      {
        id: 4,
        name: "Company 4",
        jobs: [
          { id: 7, title: "Job 7" },
          { id: 8, title: "Job 8" },
        ],
      },
      {
        id: 5,
        name: "Company 5",
        jobs: [
          { id: 9, title: "Job 9" },
          { id: 10, title: "Job 10" },
        ],
      },
      {
        id: 6,
        name: "Company 6",
        jobs: [
          { id: 11, title: "Job 11" },
          { id: 12, title: "Job 12" },
        ],
      },
      {
        id: 7,
        name: "Company 7",
        jobs: [
          { id: 13, title: "Job 13" },
          { id: 14, title: "Job 14" },
        ],
      },
      {
        id: 8,
        name: "Company 8",
        jobs: [
          { id: 15, title: "Job 15" },
          { id: 16, title: "Job 16" },
        ],
      },
      {
        id: 9,
        name: "Company 9",
        jobs: [
          { id: 17, title: "Job 17" },
          { id: 18, title: "Job 18" },
        ],
      },
      {
        id: 10,
        name: "Company 10",
        jobs: [
          { id: 19, title: "Job 19" },
          { id: 20, title: "Job 20" },
        ],
      },
    ];
    setCompanies(companiesData);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleJobClick = (companyId) => {
    setJobPage(1);
    setExpanded((prev) => {
      const newExpanded = { ...prev };
      Object.keys(newExpanded).forEach((key) => {
        if (key !== companyId) {
          newExpanded[key] = false;
        }
      });
      newExpanded[companyId] = !newExpanded[companyId];
      return newExpanded;
    });
  };

  const handleJobPageChange = (page) => {
    setJobPage(page);
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
          <div key={company.id} className="p-4 rounded-lg shadow-md mb-4">
            <div className="flex justify-between">
              <div className="text-lg font-bold">{company.name}</div>
              <button
                onClick={() => handleJobClick(company.id, 0)}
                className="text-indigo-500 hover:text-indigo-800"
              >
                <IoArrowDownOutline size={24} />
              </button>
            </div>
            {expanded[company.id] && (
              <div className="mt-4">
                <div className="text-lg font-bold">
                  {company.jobs[jobPage - 1]?.title}
                </div>
                <div className="flex justify-center mt-4">
                  {[...Array(company.jobs.length)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleJobPageChange(index + 1)}
                      className="bg-indigo-500 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg"
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(companies.length / 5))].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className="bg-indigo-500 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
