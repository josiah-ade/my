import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { TableHeader } from '@/core/types/data.interface';




interface TableProps<T=unknown> {
  headers: TableHeader;
  data: T[];
  actions: { text: string; icon?: JSX.Element }[];
  isOpen: boolean;
  setIsOpen: (x:boolean)=>void;
}

export default function Table<T>(props: TableProps<T>) {
  const { headers, data, actions, isOpen, setIsOpen } = props;

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full shadow-md rounded-lg p-4">
        <table className="w-full overflow-x-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map(function (header) {
                return (
                  <th
                    key={header.title}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                  >
                    {header.title}
                  </th>
                );
              })}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map(function (row, rowIndex) {
              return (
                <tr key={rowIndex}>
                  {headers.map(function (header) {
                    return (
                      <td
                        key={rowIndex}
                        className={`px-6 py-1 whitespace-nowrap text-sm text-gray-900 ${row[header.field as keyof typeof row] === "Disabled" ? '' : ''}`}
                      >
                        {`${row[header.field as keyof typeof row]}`}
                      </td>
                    );
                  })}
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm3-5a1 1 0 00-2 0v1a1 1 0 102 0V5zm-3.293 6.707a1 1 0 001.414-1.414L6.414 9H7a1 1 0 100-2h-1a1 1 0 00-1 1v1a1 1 0 001 1h.586l-.293.293a1 1 0 001.414 1.414zM4.707 4.293A1 1 0 015.293 5L4.707 5.707a1 1 0 01-1.414-1.414L4.707 4.293zM12.707 5l.293-.293a1 1 0 10-1.414-1.414L12 4.707a1 1 0 000 1.414zM12.707 14.293a1 1 0 010 1.414l-.293-.293a1 1 0 10-1.414 1.414l.293-.293a1 1 0 001.414-1.414zM9 15a1 1 0 112 0v1a1 1 0 11-2 0v-1zm-3.293.707A1 1 0 016.414 14H7a1 1 0 100-2H6a1 1 0 00-1 1v1a1 1 0 001 1h.586l-.293.293a1 1 0 001.414 1.414l-.293-.293z" />
                        </svg>
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 max-h-40 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-4">
                            <p className='text-center text-sm text-primary-base p-4'>Start Service</p>
                            {actions.map(function (action, actionIndex) {
                              return (
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
                                      onClick={action.text === 'Link with QR code' || action.text === 'Link with pairing code'  ? handleOpen : undefined}
                                    >
                                      {action.icon && (
                                        <span className="mr-2">
                                          {action.icon}
                                        </span>
                                      )}
                                      <span className={`text-gray-500 tex-sm ${
                                        action.text === 'Delete'
                                          ? 'text-red-600'
                                          : 'text-gray-500'
                                      }`}>
                                      {action.text}
                                      </span>
                                    </a>
                                  )}
                                </Menu.Item>
                              );
                            })}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

