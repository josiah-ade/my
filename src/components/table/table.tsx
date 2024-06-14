import React, { useState, Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { TableHeader } from '@/core/types/data.interface';
import Button from '../button/button';
import { MdOutlinePostAdd } from "react-icons/md";


// interface TableHeader {
//   title: string;
//   field: string;
// }

interface TableProps<T = unknown> {
  headers: TableHeader[];
  data: T[];
  actions?: { text: string; icon?: JSX.Element }[];
  isOpen?: boolean ,
  setIsOpen?: (x:boolean)=>void ;
}

export default function Table<T>(props: TableProps<T>) {
  const { headers, data, actions, isOpen, setIsOpen } = props;
  const [selectedRows, setSelectedRows] = useState<boolean[]>(Array(data.length).fill(false));
  const [selectAll, setSelectAll] = useState(false);

  const handleOpen = () => {
    setIsOpen &&  setIsOpen(true)
  }

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

  return (
    <div className="flex items-center justify-center">
      <div className="w-full shadow-md rounded-lg p-4">
        <table className="w-full overflow-x-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="relative">
                <input
                  type="checkbox"
                  className="absolute top-3"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              {headers.map((header) =>(
                <th 
                  key={header.title}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase"
                >
                  <section className='flex space-x-1'>
                    <div>
                      {header.title}
                    </div>
                    <div className='pointer'>
                      {header?.icon && <span className=''><Image src={header.icon} alt="icon" width={15} height={15} /></span>}
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
            {data.map((row, rowIndex) =>(
              <tr key={rowIndex} className="relative">
                  <input
                    type="checkbox"
                    className="absolute top-7"
                    checked={selectedRows[rowIndex]}
                    onChange={() => handleRowCheckboxChange(rowIndex)}
                  />
                {headers.map((header) => (
                  <td
                    key={header.field}
                    className="px-6 py-7 whitespace-nowrap text-sm text-gray-900"
                  >
                    <section>
                      {row[header.field as keyof typeof row] === "View List" ? (
                        <div>
                          <Button primary>View List</Button> 
                        </div>
                      ): (
                        <div>
                          {`${row[header.field as keyof typeof row]}`}
                        </div>
                      )}
                    </section>
                  </td>
                ))}
                <td className="px-6 py-4 text-right text-sm font-medium">
                    {actions ? (
                  <Menu as="div" className="relative inline-block text-left">
                 
                    <Menu.Button className="inline-flex justify-center w-full  rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                      <Image src="/dots.png" alt="dots" width={10} height={10} />
                      {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M9 2.6665C9 3.21879 8.55228 3.6665 8 3.6665C7.44772 3.6665 7 3.21879 7 2.6665C7 2.11422 7.44772 1.6665 8 1.6665C8.55228 1.6665 9 2.11422 9 2.6665Z" fill="black"/>
                        <path d="M9 7.99984C9 8.55212 8.55228 8.99984 8 8.99984C7.44772 8.99984 7 8.55212 7 7.99984C7 7.44755 7.44772 6.99984 8 6.99984C8.55228 6.99984 9 7.44755 9 7.99984Z" fill="black"/>
                        <path d="M8 14.3332C8.55228 14.3332 9 13.8855 9 13.3332C9 12.7809 8.55228 12.3332 8 12.3332C7.44772 12.3332 7 12.7809 7 13.3332C7 13.8855 7.44772 14.3332 8 14.3332Z" fill="black"/>
                      </svg> */}
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
                      <Menu.Items className="origin-top-right z-40 absolute right-0 mt-2 w-56 max-h-50 overflow-y-auto  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" style={{overflowY: "scroll"}}>
                        <div className="py-4 ">
                          <p className="text-center text-sm text-primary-base p-4">Start Service</p>
                          {actions && actions.map((action, actionIndex) => (
                            <Menu.Item key={actionIndex}>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={`text-center text-sm flex items-center space-x-2 ${
                                    active ? 'bg-gray-100' : ''
                                  } flex items-center px-4 py-2 text-sm ${
                                    action.text === 'Delete'
                                      ? 'text-red-600'
                                      : 'text-gray-700'
                                  }`}
                                  onClick={
                                    action.text === 'Link with QR code' ||
                                    action.text === 'Link with pairing code'
                                      ? handleOpen
                                      : undefined
                                  }
                                >
                                  {action.icon && (
                                    <span className="mr-2">{action.icon}</span>
                                  )}
                                  <span
                                    className={`text-gray-500 text-sm ${
                                      action.text === 'Delete'
                                        ? 'text-red-600'
                                        : 'text-gray-500'
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
                   ):(<></>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
