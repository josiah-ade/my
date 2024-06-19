import React, { useState } from "react";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import Modal from "@/components/modal/modal";
import {
  AccountData,
  BroadCastList,
  Data,
  TableHeader,
} from "@/core/types/data.interface";
import Table from "@/components/table/table";
import {
  Bin,
  Qr,
  Circle,
  Plus,
  Userg,
  Pencil,
  Usercancel,
} from "@/core/const/icons/icons";
import Image from "next/image";

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [dayNumber, setDayNumber] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ listName, description, dayNumber });
  };

  const headers: TableHeader[] = [
    { field: "listName", title: "List Name", icon: "/chevron.jpg" },
    { field: "description", title: "Description", icon: "/chevron.jpg" },
    { field: "contacts", title: "Subscribers", icon: "/chevron.jpg" },
    {
      field: "",
      title: "Actions",
      action: { text: "View All", href: "/user/broadcast/import-contact" },
    },
  ];
  const data: BroadCastList[] = [
    {
      listName: "Nysc Batch A stream 1",
      description: "for batch A stream 1 PCMs",
      contacts: "23 contact",
      id: "1",
    },
  ];

  const actions: Data[] = [
    { text: "Add/Import Contacts", icon: <Userg className="h-4 w-4" /> },
    { text: "Edit List", icon: <Pencil className="h-4 w-4" /> },
    { text: "Empty Contact List", icon: <Usercancel className="h-4 w-4" /> },
    { text: "Delete", icon: <Bin className="h-4 w-4 text-red-600" /> },
  ];

  return (
    <UserLayout>
      {/* <div> Wellcmoe</div> */}
      <div className="bg-white">
        <div className="flex justify-between items-center mb-4">
          <section>
            <h2 className="text-xl font-semibold text-[1.3rem]">
              Broadcast Lists
            </h2>
            <p className="text[0.9rem]">View all your contacts here</p>
          </section>
          <section className="flex items-center space-x-2">
            <Button className="text-gray-600 px-4 py-2 border-2 border-gray-400 rounded-lg flex items-center">
              <img
                src="/goggle-icon.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Connect Google Contacts
            </Button>
            <Button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              icon={<Plus />}
              onClick={handleOpen}
            >
              Create List
            </Button>
          </section>
        </div>
        <section className="border border-gray-200">
          <div className="border-l-8 border-warning-500  rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full mr-4">
                <Image src="/warning.jpg" alt="waring" width={30} height={30} />
              </div>
              <div>
                <h3 className="font-medium">Broadcast List Usage (0/1)</h3>
                <p className="text-gray-500">
                  Your current plan limits you to 1 broadcast list, upgrade to
                  create more lists
                </p>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
              Upgrade
            </button>
          </div>
        </section>
      </div>

      {showTable ? (
        <Table
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          headers={headers}
          data={data}
          action={actions}
        />
      ) : (
        <Default
          src="/list.png"
          alt="list"
          height={100}
          width={100}
          mainText="No List Created"
          subText="Click “create list” button to get started in creating your first broadcast list"
        />
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <div className="bg-white">
          <h2 className="text-2xl font-semibold mb-4">Create Broadcast List</h2>
          <p className="text-gray-600 mb-6">Create a broadcast list</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="listName"
                className="block text-sm font-medium text-gray-700"
              >
                List Name
              </label>
              <input
                id="listName"
                type="text"
                placeholder="Placeholder"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                placeholder="Placeholder"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              <p className="mt-2 text-sm text-gray-500">
                What is this list for?
              </p>
            </div>
            <div className="mb-6">
              <label
                htmlFor="dayNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Day Number on Automation
              </label>
              <input
                id="dayNumber"
                type="number"
                placeholder="0"
                value={dayNumber}
                onChange={(e) => setDayNumber(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Create list
            </button>
          </form>
        </div>
      </Modal>
    </UserLayout>
  );
}
