import React, { useState, Fragment, useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";
import { SearchIcon } from "@/core/const/icons/icons";
import Pagination from "../pagination/pagination";
import { TableHeader, TablePagination } from "@/typings/interface/component/table";
import TableLoading from "../common/loading/tableloading";
import Chip from "../chip";
import { ISelectableData } from "@/typings/interface/component/table/select";
import useDebounce from "@/providers/hooks/helper/debounce";

interface TableProps<T = unknown> {
  headers: TableHeader<T>[];
  data: T[];
  action?: { text?: string; icon?: JSX.Element; avatar?: string }[];
  isOpen?: boolean;
  search?: boolean;
  checkboxAction?: (selected: T[]) => void;
  setIsOpen?: (x: T) => void;
  loading?: boolean;
  pagination?: TablePagination;
}

type Selectable<T> = T & ISelectableData;

export default function Table<T>(props: TableProps<T>) {
  const { headers, data, action, isOpen, setIsOpen, loading, search, checkboxAction, pagination } = props;
  const [selectAll, setSelectAll] = useState(false);
  const [selectableData, setSelectableData] = useState<Selectable<T>[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage ?? 1);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const itemsPerPage = pagination?.pageSize ?? 10;

  const enableCheckbox = !!checkboxAction;

  const handleCheckboxCallback = () => {
    checkboxAction && checkboxAction(selectableData.filter((item) => item.selected));
  };

  useEffect(() => {
    handleCheckboxCallback();
  }, [selectAll]);

  useEffect(() => {
    data && setSelectableData(data.map((item, index) => ({ ...item, selected: false, originalIndex: index })));
  }, [data]);

  useEffect(() => {
    if (currentPage != 1) setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const handleSelectAllChange = () => {
    setSelectAll(!selectAll);
    setSelectableData(data.map((item) => ({ ...item, selected: !selectAll })));
  };

  const handleRowCheckboxChange = (row: Selectable<T>) => {
    const selected = selectableData[row.originalIndex ?? -1];
    if (!selected) return;
    selected.selected = !selected.selected;
    setSelectableData([...selectableData]);
    handleCheckboxCallback();
  };

  // Handle Sorting
  const handleSort = (column: string) => {
    const order = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(order);
  };

  // Handle Searching
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  function filterData(data: Selectable<T>[], searchQuery: string): Selectable<T>[] {
    return data?.filter((item) =>
      Object.values(item as Record<keyof T, T>).some((val) =>
        String(val).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    );
  }

  function sortData(data: Selectable<T>[], sortColumn: string): Selectable<T>[] {
    return data?.sort((a, b) => {
      if (!sortColumn) return 0;
      const aValue = a[sortColumn as keyof T];
      const bValue = b[sortColumn as keyof T];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const filteredData = useMemo(() => filterData(selectableData, searchQuery), [selectableData, debouncedSearchQuery]);
  const sortedData = useMemo(() => sortData(filteredData, sortColumn ?? ""), [filteredData, sortColumn, sortOrder]);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section>
      {search ? (
        <div className="max-w-[20rem] mt-8">
          <div className="mb-4 relative">
            <SearchIcon className="text-gray-400 mr-2 absolute top-3 left-3" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 text-sm focus:outline-none text-gray-600 rounded px-8 py-2 w-full"
            />
          </div>
        </div>
      ) : null}
      <div className="justify-center">
        <div className="shadow-md overflow-x-auto rounded-lg">
          <table className="w-full divide-y  border-collapse divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="relative">
                {headers.map((header, index) => (
                  <th
                    key={`table_header_index_${header.title}`}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[#344054] uppercase cursor-pointer"
                    onClick={() => header.sortable && handleSort(header.field)}
                  >
                    <section className="flex space-x-1">
                      {index == 0 && enableCheckbox ? (
                        <input
                          onClick={(e) => e.stopPropagation()}
                          type="checkbox"
                          className="mr-2"
                          checked={selectAll}
                          onChange={handleSelectAllChange}
                        />
                      ) : null}
                      <p>{header.title}</p>
                      {sortColumn === header.field ? (
                        sortOrder === "asc" ? (
                          <span>&#9650;</span> // Up arrow
                        ) : (
                          <span>&#9660;</span> // Down arrow
                        )
                      ) : null}
                    </section>
                  </th>
                ))}
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            {loading ? (
              <TableLoading headers={headers} />
            ) : (
              <tbody className="bg-white ">
                {currentItems?.map((row, rowIndex) => (
                  <tr key={`table_row_index_${rowIndex}`} className="relative">
                    {headers.map((header, index) => (
                      <td key={header.field} className="px-6 py-6 whitespace-nowrap text-sm text-gray-900">
                        <section className="flex space-x-1">
                          {index == 0 && enableCheckbox ? (
                            <input
                              type="checkbox"
                              className="mr-3"
                              // checked={selectedRows[indexOfFirstItem + rowIndex]}
                              checked={row.selected}
                              // onChange={() => handleRowCheckboxChange(indexOfFirstItem + rowIndex)}
                              onChange={() => handleRowCheckboxChange(row)}
                            />
                          ) : null}
                          {header.action?.component ? (
                            <div>
                              <header.action.component item={row} {...header.action.props} />
                            </div>
                          ) : header.component ? (
                            <header.component item={row} />
                          ) : (
                            <section className="flex items-center space-x-2">{getDataComponent(header, row)}</section>
                          )}
                        </section>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}

function getDataComponent<T>(header: TableHeader<T>, data: T) {
  let text = `${data[header.field as keyof typeof data] ?? header.default ?? ""}`;
  text = header.formatter ? header.formatter(text) : text;

  switch (header.type?.toLowerCase()) {
    case "chip":
      return <Chip text={text} />;
    default:
      return <div> {text} </div>;
  }
}
