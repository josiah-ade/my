import React, { useState, Fragment, ReactNode, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { TableHeader } from "@/core/types/data.interface";
import Button from "../button/button";
import { MdOutlinePostAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/core/const/icons/icons";

interface TableProps<T = unknown> {
  headers: TableHeader[];
  data: T[];
  action?: { text?: string; icon?: JSX.Element; avatar?: string }[];
  isOpen?: boolean;
  search?: boolean;
  checkboxAction?: (selected: T[]) => void;
  setIsOpen?: (x: boolean) => void;
}

export default function Table<T>(props: TableProps<T>) {
  const { headers, data, action, isOpen, setIsOpen, search } = props;
  const [selectedRows, setSelectedRows] = useState<boolean[]>(Array(data.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleOpen = () => {
    setIsOpen && setIsOpen(true);
  };

  const handleCheckboxCallback = () => {
    if (props.checkboxAction) {
      const selected = selectedRows.reduce<T[]>((acc, val, index) => {
        val && acc.push(data[index]);
        return acc;
      }, []);
      props.checkboxAction(selected);
    }
  };

  useEffect(() => {
    handleCheckboxCallback();
  }, [selectedRows]);

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedRows(Array(data.length).fill(newSelectAll));
  };

  const handleRowCheckboxChange = (index: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows(newSelectedRows);
  };

  const route = useRouter();

  const handleRoute = (value: any) => {
    route.push(`${value}`);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <section>
      <div className=" max-w-[20rem] mt-8">
        {search ? (
          <div className="mb-4 relative">
            <SearchIcon className="text-gray-400 mr-2 absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 text-sm focus:outline-none text-gray-600 rounded px-8 py-2 w-full"
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center justify-center">
        <div className="w-full shadow-md rounded-lg">
          <table className="w-full overflow-x-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="relative">
                {headers.map((header, index) => (
                  <th
                    key={header.title}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#344054] uppercase"
                  >
                    <section className="flex space-x-1">
                      {index == 0 ? (
                        <input type="checkbox" className="mr-3" checked={selectAll} onChange={handleSelectAllChange} />
                      ) : null}
                      <div>{header.title}</div>
                      <div className="pointer">
                        {header?.icon && (
                          <span className="">
                            <Image src={header.icon} alt="icon" width={15} height={15} />
                          </span>
                        )}
                      </div>
                    </section>
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((row, rowIndex) => (
                <tr key={rowIndex} className="relative">
                  {headers.map((header, index) => (
                    <td key={header.field} className="px-6 py-7 whitespace-nowrap text-sm text-gray-900">
                      <section className="flex justify-between space-x-1">
                        {index == 0 ? (
                          <input
                            type="checkbox"
                            className="mr-3"
                            checked={selectedRows[indexOfFirstItem + rowIndex]}
                            onChange={() => handleRowCheckboxChange(indexOfFirstItem + rowIndex)}
                          />
                        ) : null}
                        {header.action ? (
                          <div>
                            <Button onClick={() => handleRoute(header.action?.href)}>{header.action.text}</Button>
                          </div>
                        ) : (
                          <section className="flex items-center space-x-2">
                            {/* {header.action ? (
                              <Image
                                src={header.action?.avatar}
                                alt={header.action?.text}
                                width={24}
                                height={24}
                                className="rounded-full mr-2"
                              />
                            ) : null} */}
                            <div>{`${row[header.field as keyof typeof row] ?? ''}`}</div>
                          </section>
                        )}
                      </section>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    {action ? (
                      <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="inline-flex justify-center w-full  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                          <Image src="/dots.png" alt="dots" width={10} height={10} />
                        </Menu.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            className="origin-top-right z-40 absolute right-0 mt-2 w-56 max-h-50 overflow-y-auto  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            style={{ overflowY: "scroll" }}
                          >
                            <div className="py-4 ">
                              <p className="text-center text-sm text-primary-base p-4">Start Service</p>
                              {action &&
                                action.map((action, actionIndex) => (
                                  <Menu.Item key={actionIndex}>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={`text-center text-sm flex items-center space-x-2 ${
                                          active ? "bg-gray-100" : ""
                                        } flex items-center px-4 py-2 text-sm ${
                                          action.text === "Delete" ? "text-red-600" : "text-gray-700"
                                        }`}
                                        onClick={
                                          action.text === "Link with QR code" ||
                                          action.text === "Link with pairing code"
                                            ? handleOpen
                                            : undefined
                                        }
                                      >
                                        {action.icon && <span className="mr-2">{action.icon}</span>}
                                        <span
                                          className={`text-gray-500 text-sm ${
                                            action.text === "Delete" ? "text-red-600" : "text-gray-500"
                                          }`}
                                        >
                                          {action.text}
                                        </span>
                                      </a>
                                    )}
                                  </Menu.Item>
                                ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
