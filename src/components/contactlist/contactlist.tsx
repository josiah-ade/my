// pages/contacts-list.tsx
import { ContactList } from "@/core/types/data.interface";
import React from "react";
import { TiPencil } from "react-icons/ti";
import { FaTrashAlt } from "react-icons/fa";
import { Bin, Edit } from "@/core/const/icons/icons";

const ContactsList: React.FC = () => {
  const contacts: ContactList[] = [
    {
      name: "Emmanuel Friday",
      phone: "+2349157769224",
      email: "ekpenyong2510@gmail.com",
    },
    {
      name: "Emmanuel Friday",
      phone: "+2349157769224",
      email: "ekpenyong2510@gmail.com",
    },
    {
      name: "Emmanuel Friday",
      phone: "+2349157769224",
      email: "ekpenyong2510@gmail.com",
    },
    {
      name: "Emmanuel Friday",
      phone: "+2349157769224",
      email: "ekpenyong2510@gmail.com",
    },
  ];

  return (
    <div className="">
      <div className="">
        <div className="mb-4">
          <span className="text-xs font-semibold mt-4 rounded-full text-white px-2 py-1 bg-secondary">
            Recently Added
          </span>
          <h2 className="text-base font-semibold text-gray-900 mt-2">
            New Customers
          </h2>
          <p className="text-gray-600 text-sm">
            Recently imported contacts into New Customers list
          </p>
          <hr className="mt-6 border-1 border-gray-700" />
        </div>
        <ul>
          {contacts.map((contact, index) => (
            <li key={index} className="flex justify-between py-4">
              <div>
                <p className="font-semibold text-base text-gray-900">
                  {contact.name}
                </p>
                <p className="text-sm text-gray-500 text-gray-600">
                  {contact.phone} • {contact.email}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-gray-600">
                  <Edit />
                </button>
                <button className="text-gray-600">
                  <Bin />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactsList;
