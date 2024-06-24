import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { useEffect, useRef, useState } from "react";
import { ICreateAccount } from "@/typings/interface/account";

interface IProp extends ModalProps {}

const defaultValue: ICreateAccount = {
  phoneNumber: "",
  description: "",
};

export function CreateBroadcastModal({ isOpen, onClose }: IProp) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ICreateAccount>({ ...defaultValue });

  useEffect(() => {
    return () => {
      setFormData({ ...defaultValue });
      formRef?.current?.reset();
    };
  }, [isOpen]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white">
        <h2 className="text-2xl font-semibold mb-4">Create Broadcast List</h2>
        <p className="text-gray-600 mb-6">Create a broadcast list</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="listName" className="block text-sm font-medium text-gray-700">
              List Name
            </label>
            <input
              id="listName"
              name="listName"
              type="text"
              placeholder="Placeholder"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              id="description"
              name="description"
              type="text"
              placeholder="Placeholder"
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">What is this list for?</p>
          </div>
          <div className="mb-6">
            <label htmlFor="dayNumber" className="block text-sm font-medium text-gray-700">
              Day Number on Automation
            </label>
            <input
              id="dayNumber"
              name="dayNumber"
              type="number"
              placeholder="0"
              onChange={handleChange}
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
  );
}
