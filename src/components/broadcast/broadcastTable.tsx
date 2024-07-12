import {
  HeaderBroadcast,
  TableRowBroadcast,
} from "@/core/types/data.interface";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface TableProps {
  headers: HeaderBroadcast[];
  data: TableRowBroadcast[];
}

interface ListProps {
  lists: string[];
}

function ListPopover({ lists }: ListProps) {
  return (
    <div className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {lists.map((list, index) => (
          <p key={index} className="block px-4 py-2 text-sm text-gray-700">
            {list}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function BroadCastMessageTable({
  headers,
  data,
}: TableProps): JSX.Element {
  const [showPopover, setShowPopover] = useState(false);
  const router = useRouter();

  const handleRoute = (value: string) => {
    router.push(`/user/broadcast/message/view-broadcast`);
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-2 py-3 text-left text-sm font-medium bg-gray-50 text-gray-500 uppercase"
                    >
                      {header.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="bg-white border-b">
                    {headers.map((header, colIndex) => {
                      const key = header.field as keyof typeof row;
                      if (key === "lists") {
                        return (
                          <td
                            key={colIndex}
                            className="px-2 py-3 whitespace-nowrap text-xs text-gray-500"
                          >
                            <div className="relative">
                              <button
                                type="button"
                                className="text-blue-600 hover:underline"
                                onMouseEnter={() => setShowPopover(true)}
                                onMouseLeave={() => setShowPopover(false)}
                              >
                                {row.lists.length} Lists
                              </button>
                              {showPopover && (
                                <div className="absolute bg-white shadow-lg border rounded p-2">
                                  <ul>
                                    {row.lists.map((list, index) => (
                                      <li key={index}>{list}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      }
                      return (
                        <td
                          key={colIndex}
                          className={`px-2 py-3 whitespace-nowrap text-xs mt-1 text-gray-500 ${
                            row[key] === "pending"
                              ? "bg-warning-50 text-warning-700 px-2 py-1 rounded-full"
                              : ""
                          }`}
                          onClick={
                            key === "actions"
                              ? () => handleRoute(row[key] ?? '')
                              : undefined
                          }
                        >
                          {row[key]}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
