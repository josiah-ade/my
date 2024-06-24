import React, { useState } from "react";
import Button from "../button/button";
import Image from "next/image";
import { WhatsappContact } from "@/core/types/data.interface";
import Table from "../table/index";
import { TableHeader } from "@/typings/interface/component/table";

// components/FileUpload.tsx
const FileUpload: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors duration-200">
          <div className="text-center m-auto flex flex-col items-center justify-center ">
            <div className="border-2 border-red h-10 w-10 p-2 rounded-full bg-gray-100 flex items-center justify-center">
              <Image src="/cloud-upload.png" alt="upload" width={30} height={30} />
            </div>
            <p className="text-sm text-gray-600">
              <span className="text-primary cursor-pointer hover:underline">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV files only</p>
          </div>
        </div>
        <div className="mt-4 text-center flex items-center justify-center">
          <Button primary className="px-4 py-2 rounded-md focus:ring-opacity-75">
            Browse Files
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function CSV() {
  const [showTable, setShowTable] = useState(true);
  const [search] = useState(true);

  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "Phone Number", icon: "/chevron.jpg" },
    {
      field: "name",
      title: "Name",
      icon: "/chevron.jpg",
    },
    { field: "country", title: "Country", icon: "/chevron.jpg" },
    {
      field: "select",
      title: "Select",
      icon: "/chevron.jpg",
      //   action: { text: "View All", href: "/user/broadcast/import-contact" },
    },
  ];

  const data: WhatsappContact[] = [
    {
      phoneNumber: "+234 915 336 1212",
      name: "Kobe Nuels",
      country: "Nigeria",
      avatar: "/path/to/avatar.png", // Replace with actual image path
      selected: true,
    },
    {
      phoneNumber: "+234 915 336 1212",
      name: "Kobe Nuels",
      country: "Nigeria",
      avatar: "/path/to/avatar.png",
      selected: true,
    },
    {
      phoneNumber: "+234 915 336 1212",
      name: "Kobe Nuels",
      country: "Nigeria",
      avatar: "/path/to/avatar.png",
      selected: true,
    },
    {
      phoneNumber: "+234 915 336 1212",
      name: "Kobe Nuels",
      country: "Nigeria",
      avatar: "/path/to/avatar.png",
      selected: true,
    },
  ];

  return (
    <section>
      <section className="flex justify-between items-center mt-12">
        <div>
          <h2 className="text-lg font-bold">Import from CSV File </h2>
          <p className="text-gray-600 text-sm">Import contact details from google contacts </p>
        </div>
        <div>
          <Button primary>Import</Button>
        </div>
      </section>
      <div className="flex items-center justify-between p-2 mt-6 border-l-8 border-l-[#0D5EBA] bg-white border rounded shadow-sm">
        <div className="flex items-center p-2 justify-center space-x-4">
          <div className="bg-[#C6DDF7] h-4 w-4 rounded-full p-2">
            {/* <div className="bg-secondary h-2.5 w-2.5 rounded-full"></div> */}
            <Image src="/check-circle.png" alt="check" width={40} height={40} />
          </div>
          <span className="text-gray-900 text-base font-bold">
            Download our supported csv format template
          </span>
        </div>
        <a href="/path/to/template.csv" download className="text-orange-500 hover:underline">
          Download Template
        </a>
      </div>

      <section className="mt-10">
        {showTable ? (
          <Table
            //   setIsOpen={setIsOpen}
            //   isOpen={isOpen}
            headers={headers}
            data={data}
            search={search}
            //   actions={actions}
          />
        ) : (
          <FileUpload />
        )}
      </section>
    </section>
  );
}
