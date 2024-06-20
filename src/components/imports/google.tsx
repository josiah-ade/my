import React, { useState } from "react";
import Button from "../button/button";
import Table from "../table/table";
import { TableHeader, WhatsappContact } from "@/core/types/data.interface";
import Default from "../default/default";
export default function Google() {
  const [search] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "Phone Number", icon: "/chevron.jpg" },
    {
      field: "name",
      title: "Name",
      icon: "/chevron.jpg",
      action: { text: "name", avatar: "/path/to/avatar.png" },
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
    <section className="mt-20">
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Import from Google Contacts</h2>
          <p className="text-gray-600 text-sm">
            Import contact details from google contacts
          </p>
        </div>
        <div>
          <Button primary>Import</Button>
        </div>
      </section>

      <section>
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
          <section className="my-20">
            <Default
              src="/googlelist.png"
              btn={true}
              alt="list"
              height={100}
              width={100}
              mainText="Connect a google account"
              subText="connect a google account you want to import your contacts from"
            />
          </section>
        )}
      </section>
    </section>
  );
}
