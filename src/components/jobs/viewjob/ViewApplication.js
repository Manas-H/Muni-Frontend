import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

const ViewApplications = () => {
  const [viewJobPostings, setViewJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState({
    jobTitle: true,
    date: true,
    jobType: true,
    instituteName: true,
    pending: true,
    autoShortlisted: true,
    shortlist: true,
    assessment: true,
    interview: true,
    offerSent: true,
    campusDetails: true,
    status: true,
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setViewJobPostings(response.data);
      //   console.log(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching job postings:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobPostings();
  }, [fetchJobPostings]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/job-postings/${id}`
        );
        if (response.status === 200) {
          console.log("Job posting deleted successfully");
          alert("Deleted successfully");
          fetchJobPostings();
        }
      } catch (error) {
        console.error("Error deleting job posting:", error);
      }
    },
    [fetchJobPostings]
  );

  const data = React.useMemo(() => {
    return viewJobPostings.map((job) => ({
      jobTitle: job.jobTitle || "",
      date: job.expiryDate
        ? new Date(job.expiryDate).toLocaleDateString()
        : "N/A",
      jobType: job.jobPostingType || "",
      instituteName: job.advancedFields?.hostInstituteName || "N/A",
      pending: 0, // Placeholder
      autoShortlisted: 0, // Placeholder
      shortlist: 0, // Placeholder
      assessment: 0, // Placeholder
      interview: 0, // Placeholder
      offerSent: 0, // Placeholder
      campusDetails: "", // Placeholder
      status: "Pending",
      _id: job._id,
    }));
  }, [viewJobPostings]);

  const columns = React.useMemo(
    () =>
      [
        {
          header: "JOB TITLE",
          accessorKey: "jobTitle",
          cell: ({ getValue }) => (
            <div className="text-start">
              <span className="mr-2">
                <i className="fa fa-plus-circle text-xs" />
              </span>
              {getValue()}
            </div>
          ),
        },
        {
          header: "DATE",
          accessorKey: "date",
        },
        {
          header: "JOB TYPE",
          accessorKey: "jobType",
        },
        {
          header: "INSTITUTE NAME",
          accessorKey: "instituteName",
        },
        {
          header: "PENDING",
          accessorKey: "pending",
        },
        {
          header: "AUTO SHORTLISTED",
          accessorKey: "autoShortlisted",
        },
        {
          header: "SHORTLIST",
          accessorKey: "shortlist",
        },
        {
          header: "ASSESSMENT",
          accessorKey: "assessment",
        },
        {
          header: "INTERVIEW",
          accessorKey: "interview",
        },
        {
          header: "OFFER SENT",
          accessorKey: "offerSent",
        },
        {
          header: "CAMPUS DETAILS",
          accessorKey: "campusDetails",
        },
        {
          header: "Status",
          accessorKey: "status",
          cell: ({ row }) => (
            <div className="flex items-center space-x-2">
              <Link
                to={`/job-details/${row.original._id}`}
                className="flex items-end relative z-10 box_shadow border border-gray-400 px-2 py-1 hover:bg-blue-700 hover:text-white"
              >
                Edit
                <i className="fa fa-edit pl-1" />
              </Link>
              <button
                onClick={() => handleDelete(row.original._id)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fa fa-trash" />
              </button>
            </div>
          ),
        },
      ].filter((column) => selectedColumns[column.accessorKey]),
    [handleDelete, selectedColumns]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const toggleColumnVisibility = (columnKey) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // Pagination logic
  const totalEntries = data.length;
  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalEntries);
  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container md:w-[97%]  md:mx-5 my-3 bg-[#f7f7f7] border border-gray-300 overflow-x-auto">
      <h1 className="py-3 text-left px-5 text-lg font-bold border-b-[1px] border-gray-300 mb-4">
        Application Tracking System (ATS)
      </h1>
      <div className="flex items-start mx-10 space-x-2 overflow-x-auto">
        <button className=" border-t-[3px] border-[#0A294F] text-[12px] px-1 py-0.5 rounded">
          All Jobs
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Pending
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Shortlisted
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Assessment
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Group Discussion
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Buffer
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Interview
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Selected
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Rejected
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Offer Sent
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Offer Accepted
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          Offer Not Accepted
        </button>
        <button className="border-[1px] border-gray-200 text-[12px] px-1 py-0.5 rounded">
          All
        </button>
      </div>
      <div className="border-[1px] border-gray-200 mx-10 bg-white">
        <div className=" mb-4 flex items-center mx-2 my-2  overflow-x-auto">
          <span className="mr-2 text-[14px]">Show</span>
          <select
            className="border p-0 rounded mr-2"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="mr-4 text-[14px]">entries</span>
          <button className="box_shadow border border-black px-3 py-1 text-[12px] mr-2 text-bold hover:text-white hover:bg-blue-700">
            Download
          </button>
          <button
            className="box_shadow border border-black px-3 py-1 text-[12px] mr-2 ext-bold hover:text-white hover:bg-blue-700"
            onClick={() => setIsPopupVisible(!isPopupVisible)}
          >
            Column visibility
          </button>
          {isPopupVisible && (
            <div className="absolute bg-white shadow-lg border p-4 top-60 right-52">
              <h1 className="pb-2">Column Visibilty Controls</h1>
              <div
                className={`grid grid-cols-4 gap-5 transition-opacity duration-300 ${
                  isPopupVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                {Object.keys(selectedColumns).map((columnKey) => (
                  <div
                    key={columnKey}
                    className={` p-1 px-7 text-xs border cursor-pointer ${
                      selectedColumns[columnKey]
                        ? "bg-gray-400 border border-blue-400"
                        : "bg-blue-200"
                    }`}
                    onClick={() => toggleColumnVisibility(columnKey)}
                  >
                    {columnKey.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex justify-between items-center mx-2  overflow-x-auto">
          <div className="text-[#333333] text-[12px] ">
            Showing {startEntry} to {endEntry} of {totalEntries} entries
          </div>
          <div>
          <button
              className="text-[10px] border border-gray-200 px-4 py-2 mr-0.5"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`text-[10px] border border-gray-200 px-4 py-2 mr-0.5 ${
                  page === currentPage ? "bg-[#282c33] text-white" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="text-[10px] border border-gray-200 px-4 py-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-[11px] text-[#808080] font-bold p-2 bg-gray-100"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="text-xs border-b-[1px] border-gray-200 p-2"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;
