import React, { useState } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import Table from "@/components/table";
import { BroadCastList } from "@/core/types/data.interface";
import UserLayout from "@/layout/user";
import Modal from "@/components/modal/modal";
import { TableHeader } from "@/typings/interface/component/table";

interface EditContactProps {
  name?: string;
  phone?: string;
  email?: string;
  tag?: string;
  automationDay?: number;
  onSave?: (data: { name?: string; phone?: string; email?: string; tag?: string; automationDay?: number }) => void;
}

export default function NewCustomer({}) {
  const [showTable] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = React.useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSave(formData);
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleIsClose = () => {
    setIsOpen(false);
  };

  const headers: TableHeader[] = [
    { field: "listName", title: "List Name", icon: "/chevron.jpg" },
    { field: "description", title: "Description", icon: "/chevron.jpg" },
    { field: "contacts", title: "Subscribers", icon: "/chevron.jpg" },
    {
      field: "",
      title: "Actions",
    },
  ];
  const data: BroadCastList[] = [
    {
      listName: "Nysc Batch A stream 1",
      description: "for batch A stream 1 PCMs",
      contacts: 23,
      id: "1",
    },
  ];

  return (
    <UserLayout>
      <Breadcrumb />

      <div className="block md:flex mt-2 md:mt-0 justify-between">
        <section className="mt-4">
          <h2 className="text-xl font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-base">Manually type contact details to be imported</p>
        </section>
        <section className="flex items-center space-x-2">
          <Button onClick={() => handleIsOpen()} className="border-2 border-primary text-primary text-sm">
            Import
          </Button>
          <Button className="" primary>
            Send Broadcast
          </Button>
        </section>
      </div>

      <div className="">
        {showTable ? (
          <section className="">
            <Table search={true} headers={headers} data={data} />
          </section>
        ) : (
          <section className="my-20">
            <Default
              src="/list.png"
              alt="list"
              height={100}
              width={100}
              mainText="No Contacts Found"
              subText="Import your contacts to begin"
            />
          </section>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={handleIsClose}>
        <form onSubmit={handleSubmit} className=" bg-white p-8 rounded-md ">
          <h2 className="text-2xl font-bold mb-4">Edit Contact</h2>
          <p className="text-sm text-gray-600 mb-6">Make an edit to this contact information</p>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              //   value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              //   value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              //   value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Tag</label>
            <select
              name="tag"
              //   value={formData.tag}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Placeholder">Placeholder</option>
              <option value="Tag1">Tag1</option>
              <option value="Tag2">Tag2</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Day Number on Automation</label>
            <input
              type="number"
              name="automationDay"
              //   value={formData.automationDay}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-orange-600"
          >
            Save Changes
          </Button>
        </form>
      </Modal>
    </UserLayout>
  );
}
