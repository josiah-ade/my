import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { useEffect, useRef, useState } from "react";
import { IBroadcastLists, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { useCreateBroadCastList, useEditBroadCastId } from "@/providers/hooks/mutate/broadcast";

interface IProp extends ModalProps {
  broadcastDetail?: IBroadcastLists;
}

const defaultValue: ICreateBroadcastList = {
  listName: "",
  description: "",
};

export function CreateBroadcastModal({ isOpen, onClose, broadcastDetail }: IProp) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ICreateBroadcastList>({
    listName: broadcastDetail?.listName ?? "",
    description: broadcastDetail?.description ?? "",
  });
  const { mutate: createBroadcast } = useCreateBroadCastList({
    onSuccess: () => onClose(),
    options: {
      errorConfig: { title: "Failed to Create Broadcast List" },
      successConfig: { title: "Broadcast List Created", text: "The broadcast list was successfully created." },
    },
  });

  const { mutate: editBroadcast } = useEditBroadCastId({
    onSuccess: () => onClose(),
    options: {
      errorConfig: { title: "Failed to Edit Broadcast List" },
      successConfig: { title: "Broadcast List Edited", text: "The broadcast list was successfully edited." },
    },
  });

  const isEditing = !!broadcastDetail?.id;

  useEffect(() => {
    return () => {
      setFormData({ ...defaultValue });
      formRef?.current?.reset();
    };
  }, [broadcastDetail?.id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    isEditing ? editBroadcast({ ...broadcastDetail, ...formData }) : createBroadcast(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white">
        <h2 className="text-2xl font-semibold mb-4">{isEditing ? "Edit Broadcast List" : "Create Broadcast List"}</h2>
        <p className="text-gray-600 mb-6">{isEditing ? "Edit Broadcast List" : "Create Broadcast List"}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="listName" className="block text-sm font-medium text-gray-900">
              List Name
            </label>
            <input
              id="listName"
              name="listName"
              type="text"
              required
              placeholder="List Name"
              defaultValue={broadcastDetail?.listName ?? ""}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <input
              required
              id="description"
              name="description"
              type="text"
              placeholder="Description"
              onChange={handleChange}
              defaultValue={broadcastDetail?.description ?? ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">What is this list for?</p>
          </div>
          <div className="mb-6">
            <label htmlFor="dayNumber" className="block text-sm font-medium text-gray-900">
              Day Number on Automation
            </label>
            <input
              required
              id="dayNumber"
              name="dayNumber"
              type="number"
              placeholder="0"
              defaultValue={0}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {isEditing ? "Update" : " Create list"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
