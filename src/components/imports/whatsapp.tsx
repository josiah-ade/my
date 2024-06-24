import React, { useState } from "react";
import Button from "../button/button";
import Table from "../table/index";
import { WhatsappContact } from "@/core/types/data.interface";
import { TableHeader } from "@/typings/interface/component/table";
export default function Whatsapp() {
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
    <section className="mt-20">
      <section className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-sm">Manually type contact details to be imported</p>
        </div>
        <div>
          <Button primary>Import 35 contacts</Button>
        </div>
      </section>

      <section>
        <Table
          //   setIsOpen={setIsOpen}
          //   isOpen={isOpen}
          headers={headers}
          data={data}
          search={search}
          //   actions={actions}
        />
      </section>
    </section>
  );
}
