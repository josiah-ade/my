import React, { useState } from "react";
import Pagination from "./pagination";

interface TableRow {
  receiver: string;
  timeSent: string;
  status: string;
  timeRead?: string;
  comment: string;
}

interface TableComponentProps {
  data: TableRow[];
}

function ViewBroadcastTable({ data }: TableComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              {["Receiver", "Time Sent", "Status", "Time Read", "Comment"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="px-4 py-4 text-left text-xs font-medium text-gray-600 uppercase"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index} className="border-b ">
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  {row.receiver}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  {row.timeSent}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  <span
                    className={`px-4 py-1 rounded-full  ${getStatusColor(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  {row.timeRead || "-"}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-500">
                  {row.comment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-success-50 text-success-700";
    case "paused":
      return "bg-warning-50 text-warning-700";
    case "failed":
      return "bg-error-50 text-error-700";
    case "read":
      return "bg-secondary-50 text-secondary-700";
    default:
      return "bg-gray-500";
  }
}

export default ViewBroadcastTable;
