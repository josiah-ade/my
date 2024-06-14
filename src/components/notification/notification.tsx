import React from 'react';
import { IoIosClose } from "react-icons/io";

interface NotificationProps {
  message: string;
  description: string;
  additionalInfo?: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, description, additionalInfo, onClose }) => {
  return (
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="bg-green-100 rounded-full p-1">
              <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            <p className="mt-1 text-sm text-gray-700">{additionalInfo}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              {/* <XIcon className="h-5 w-5" aria-hidden="true" /> */}
              <IoIosClose className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
