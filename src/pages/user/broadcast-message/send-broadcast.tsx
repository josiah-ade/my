import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import ListSelector from "@/components/broadcast/listSelector";
import MessageForm from "@/components/broadcast/messageForm";
import Modal from "@/components/modal/modal";
import { FormData, List } from "@/core/types/data.interface";
import UserLayout from "@/layout/user";
import { useCreateBroadcastMessage } from "@/providers/hooks/mutate/createbroadcastmessage";
import React, { useState, ChangeEvent } from "react";

interface MyStateType {
  count: boolean;
}

type SetStateType = React.Dispatch<React.SetStateAction<MyStateType>>;

const initialLists: List[] = [
  { name: "List 1", contacts: 23, selected: false },
  { name: "List 2", contacts: 23, selected: false },
  { name: "List 3", contacts: 23, selected: false },
  { name: "List 4", contacts: 23, selected: false },
  { name: "List 5", contacts: 23, selected: false },
];

export default function SendBroadast() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedList, setSelectedList] = useState<string>("");
  const [lists, setLists] = useState<List[]>(initialLists);

  const createMessageMutation = useCreateBroadcastMessage({
    onSuccess: () => console.log("Message created successfully"),
    onError: (error) => console.error("Error creating message", error),
  });

  const handleIsClose = () => {
    setIsOpen(false);
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeCustomer = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setSelectedList(event.target.value);
    // router.push(`/user/broadcast/${event.target.value}`);
  };

  function handleSubmit(data: FormData) {
    console.log("Form Data:", data);
    // createMessageMutation.mutate(data);
  }

  const handleToggle = (index: number) => {
    const newLists = lists.map((list, i) =>
      i === index ? { ...list, selected: !list.selected } : list
    );
    setLists(newLists);
  };

  const handleSelectAll = () => {
    const allSelected = lists.every((list) => list.selected);
    const newLists = lists.map((list) => ({ ...list, selected: !allSelected }));
    setLists(newLists);
  };

  return (
    <UserLayout>
      <Breadcrumb />
      <div>
        <section className="mt-4">
          <h2 className="text-xl font-semibold text-[1.3rem]">Send Broadcast Message</h2>
          <p className="text[0.9rem]">Send a broadcast messages from here</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="col-span-1">
            <label className="block text-gray-900 font-semibold leading-8 text-sm">
              Select Account
            </label>
            <select
              className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
              onChange={handleChange}
            >
              <option value="default" className="px-2">
                Select Account
              </option>
              <option value="manually">Main</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Which number are you broadcasting from?</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-900 font-semibold leading-8 text-sm">
              Broadcast To
            </label>
            <select
              onChange={handleChangeCustomer}
              className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            >
              <option value="default">Select List</option>
              {/* <option value="default">Select list</option> */}
              <option value="newcustomer">
                New Customers
                {/* <Link href="/newcustomer"></Link> */}
              </option>
              {/* Add your options here */}
            </select>
            <p className="text-sm text-gray-500 mt-1">Where are you broadcasting to</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-900 font-semibold leading-8 text-sm">Template</label>
            <select
              onChange={handleChangeCustomer}
              className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            >
              <option value="">No Template</option>
              {/* <option value="default">Select list</option> */}
              <option value="newcustomer">
                Tem Gin
                {/* <Link href="/newcustomer"></Link> */}
              </option>
              {/* Add your options here */}
            </select>
            <p className="text-sm text-gray-500 mt-1">are you using a template?</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
          <div>
            <MessageForm onOpen={handleIsOpen} onSubmit={handleSubmit} />
          </div>
          <div>
            {selectedList !== "" && (
              <div>
                <ListSelector lists={lists} onToggle={handleToggle} onSelectAll={handleSelectAll} />
              </div>
            )}
          </div>
        </section>

        <Modal isOpen={isOpen} onClose={handleIsClose}>
          <div className="max-w-lg mx-auto">
            <h2 className="text-lg font-bold mb-2">Broadcast Configuration</h2>
            <p className="text-gray-600 mb-4">Configure your broadcast</p>

            <div className="mb-4">
              <label className="block text-gray-700">Select Tags</label>
              <select className="w-full p-2 mt-2 border rounded">
                <option>select tags</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Conditional Tags</label>
              <select className="w-full p-2 mt-2 border rounded">
                <option>Select condition</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                we will <b>include</b> or <b>exclude</b> contacts with the selected tags above
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Exclude Contacts From List</label>
              <select className="w-full p-2 mt-2 border rounded">
                <option>select</option>
              </select>
              <p className="text-gray-600 text-sm mt-1">
                we will not send to contacts in the list(s) you selected if they are found in any of
                the selected list(s) here
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">
                Send to Contacts who joined on a particular date
              </label>
              <input type="date" className="w-full p-2 mt-2 border rounded" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Send Test Broadcast</label>
              <input
                type="text"
                placeholder="Enter your number to receive test broadcast"
                className="w-full p-2 mt-2 border rounded"
              />
            </div>

            <div className="">
              <button className="w-full py-2 bg-gray-500 text-white rounded">
                Send Test Broadcast
              </button>
              <button className="w-full py-2 mt-2 bg-primary text-white rounded">
                Send Broadcast
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </UserLayout>
  );
}
