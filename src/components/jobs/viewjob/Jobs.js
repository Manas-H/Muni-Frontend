import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [viewJobPostings, setViewJobPostings] = useState([]);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredJobPostings = viewJobPostings.filter((job) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesId = job._id.toLowerCase().includes(searchLower);
    const matchesJobTitle = job.jobTitle.toLowerCase().includes(searchLower);
    const matchesJobDesc =
      job.designation?.toLowerCase().includes(searchLower) || false;
    const matchesJobVisibility = job.jobVisibility
      .toLowerCase()
      .includes(searchLower);
    const matchesSkills = job.selectedSkills.some((skill) =>
      skill.toLowerCase().includes(searchLower)
    );

    return (
      matchesId ||
      matchesJobTitle ||
      matchesJobDesc ||
      matchesJobVisibility ||
      matchesSkills
    );
  });

  const handleToggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const fetchJobPostings = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/job-postings`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Job Postings:", response.data);
      setViewJobPostings(response.data);
    } catch (err) {
      alert(error);
      console.error("Error fetching job postings:", err);
      setError(err.message);
    }
  }, [error]);

  useEffect(() => {
    fetchJobPostings();
  }, [fetchJobPostings]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/job-postings/${id}`);
      if (response.status === 200) {
        // Handle successful deletion (e.g., remove item from the state or refetch data)
        console.log("Job posting deleted successfully");
        // Optionally: refresh the list or update state
        // fetchJobPostings(); // or another function to update the UI
        alert("Deleted successfully");
        fetchJobPostings();
      }
    } catch (error) {
      console.error("Error deleting job posting:", error);
    }
  };

  return (
    <div className="bg-white mx-5 mt-5">
      <div className="border border-gray-200 shadow-sm">
        <div className="flex items-start px-7 py-3 w-full bg-gray-100 border-b-[1px] ">
          <h1 className="text-black font-bold text-lg">Posted Jobs</h1>
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center justify-end m-5">
            {filteredJobPostings.length > 0 && (
              <span className="text-gray-500 font-semibold">
                {filteredJobPostings.length} items
              </span>
            )}
            <input
              type="search"
              placeholder="Search"
              className="rounded-sm p-1 ml-1 px-5 border border-gray-300 placeholder:text-gray-500 placeholder:text-base placeholder:font-semibold"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="w-full overflow-x-auto">
            <div className="mx-5 my-3  overflow-x-auto w-full">
              <table className="border border-[#dee2e6] w-full border-b-[1px] ">
                <thead className="border-b-[1px] border-[#dee2e6]">
                  <tr>
                    <th className="text-xs md:text-sm py-2 text-[rgb(146,146,146)]">
                      No.
                    </th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Job Title</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Type</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Designation</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Salary</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Skills</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292]">Visibility</th>
                    <th className="text-xs md:text-sm md:py-2 text-[#929292] "> </th>
                  </tr>
                </thead>
                <tbody className="overflow-x-auto">
                  {filteredJobPostings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-3 text-black">
                        No jobs found. 
                      </td>
                    </tr>
                  ) : (
                    filteredJobPostings.map((job, index) => (
                      <tr
                        key={job._id}
                        className="border-b-[1px] border-[#dee2e6] hover:bg-gray-100 overflow-x-auto"
                      >
                        <td className="py-3 text-sm text-black">{index + 1}</td>

                        <td className="py-3 text-xs">
                          <Link
                            to={`/job-details/${job._id}`} // Navigate to a new page with the job ID
                            className="text-blue-700 hover:underline"
                          >
                            {job.jobTitle}
                          </Link>
                        </td>
                        <td className="py-3 px-1 text-xs text-black">
                          {Object.keys(job.jobPreference)
                            .filter(
                              (preference) => job.jobPreference[preference]
                            )
                            .map(
                              (preference) =>
                                preference.charAt(0).toUpperCase() +
                                preference.slice(1).replace(/([A-Z])/g, " $1")
                            )
                            .join(", ") || "N/A"}
                        </td>
                        <td className="py-3 text-xs text-black">
                          {job.designation}
                        </td>
                        <td className="py-3 text-xs text-black">
                          {job.salary.min} - {job.salary.max}{" "}
                          {job.salary.currency}
                        </td>
                        <td className="py-3 text-xs text-black">
                          <div
                            className={`relative ${
                              expanded === job._id
                                ? "whitespace-normal"
                                : "whitespace-nowrap overflow-hidden text-ellipsis"
                            } w-32`}
                          >
                            {expanded === job._id
                              ? job.selectedSkills.join(", ")
                              : job.selectedSkills.slice(0, 2).join(", ")}

                            {job.selectedSkills.length > 3 && (
                              <span
                                className="text-red-400 cursor-pointer"
                                onClick={() => handleToggle(job._id)}
                              >
                                {expanded === job._id
                                  ? " Read Less"
                                  : " Read More"}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 text-xs ">
                          <span className="text-[#053305] bg-[#cafbca] px-2 py-1 rounded-md">
                            {job.jobVisibility}
                          </span>
                        </td>
                        <td className="  py-3 w-[60px] text-xs text-black pr-7">
                          <div className="group">
                            <button className="flex items-end relative z-10 box_shadow border border-gray-400 px-5 py-1.5 hover:bg-blue-700 hover:text-white">
                              Action
                              <i className="fa fa-angle-down pl-1" />
                            </button>{" "}
                            <div className="hidden group-hover:block">
                              <div className="absolute z-50 flex flex-col items-center bg-white border w-24 ">
                                <Link
                                  to={`/edit-job/${job._id}`}
                                  title="Edit"
                                  className="py-1.5 text-[10px] hover:bg-blue-700 cursor-pointer w-full"
                                >
                                  Edit <i className="fa fa-pencil-square-o"></i>
                                </Link>
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  title="Delete"
                                  className="py-1.5 text-[10px] hover:bg-blue-700 cursor-pointer w-full"
                                >
                                  Delete <i className="fa fa-trash-o"></i>
                                </button>
                                <a
                                  title="Download"
                                  className="py-1.5 text-[10px] hover:bg-blue-700 cursor-pointer w-full"
                                  href="@"
                                  data-toggle="modal"
                                  data-target="#uploadExcelModal"
                                >
                                  Upload <i className="fa fa-upload"></i>
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
