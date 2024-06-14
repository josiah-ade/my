import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import React, { useState } from "react";

export default function ImportContacts() {
  const [showTable, setShowTable] = useState(true);

  return (
    <UserLayout>
      <section>
        <Breadcrumb />
        <div className="">
          <div className="bg-white p-6 rounded-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Import Contacts into a broadcast list
              </h2>
              <div className="flex items-center space-x-2">
                <img
                  src="https://avatars.githubusercontent.com/u/1?v=4"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <a href="#" className="text-blue-600">
                  Sign Out
                </a>
              </div>
            </div>
            <p className="mb-6">import all your contacts here</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">
                  Select Source
                </label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select source</option>
                  {/* Add your options here */}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  where are you importing from?
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">
                  Select Broadcast List
                </label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Select list</option>
                  {/* Add your options here */}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  The list you are importing into?
                </p>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-700 mb-2">
                  Day Number on Automation
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>
        </div>

        <Default
          src="/book.png"
          alt="No accounts added"
          height={100}
          width={100}
          mainText="No accounts added"
          subText="Click 'add account' button to get started in linking your first WhatsApp account"
        />
      </section>
    </UserLayout>
  );
}
