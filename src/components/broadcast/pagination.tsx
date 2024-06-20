import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalCount, pageSize, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <ul className="inline-flex items-center -space-x-px">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} border rounded`}
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
