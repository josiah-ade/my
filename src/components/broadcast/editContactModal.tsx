import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { useState } from "react";
import { IBroadcastContact } from "@/typings/interface/broadcasts";
import Button from "../button/button";
import { useEditBroadcastContact } from "@/providers/hooks/mutate/createcontact";

interface IProp extends ModalProps {
  contact: IBroadcastContact;
}

export function EditBroadcastContactModal({ isOpen, onClose, contact }: IProp) {
  const [formData, setFormData] = useState<IBroadcastContact>({ ...contact });

  const { mutate: editContact } = useEditBroadcastContact({
    onSuccess: onClose,
    options: {
      errorConfig: { title: "Failed to edit contact" },
      successConfig: { title: "Contact Edited", text: "The contact was successfully edited." },
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editContact(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className=" bg-white rounded-md ">
        <h2 className="text-2xl font-bold mb-2.5">Edit Contact</h2>
        <p className="text-sm text-gray-600 mb-6">Make an edit to this contact information</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Phone</label>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={formData.phoneNumber}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Tag</label>
        <select
          name="tag"
            value={formData.tag}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Placeholder">Placeholder</option>
          <option value="Tag1">Tag1</option>
          <option value="Tag2">Tag2</option>
        </select>
      </div> */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Day Number on Automation</label>
          <input
            type="number"
            name="automationDay"
            defaultValue={formData.automationDay}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <Button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white font-medium rounded-md hover:bg-orange-600"
        >
          Save Changes
        </Button>
      </form>
    </Modal>
  );
}
