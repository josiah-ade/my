import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { ICreateAccount } from "@/typings/interface/account";
import { useEffect, useRef, useState } from "react";
import { useCreateAccount } from "@/providers/hooks/mutate/account";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";

interface IProps extends ModalProps {}

const defaultValue: ICreateAccount = {
  phoneNumber: "",
  description: "",
};

export default function AddAccountModal({ isOpen, onClose }: IProps) {
  const setNotification = useNotificationStore((state) => state.setDisplay);
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: createAccount } = useCreateAccount({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Account successfully",
          text: "Your new account has been created successfully",
        },
      });
      onClose();
    },
    options: { errorConfig: { title: "Failed to create account" } },
  });

  const [user, setUser] = useState<ICreateAccount>({ ...defaultValue });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createAccount(user);
  };

  useEffect(() => {
    return () => {
        setUser({ ...defaultValue });
      formRef?.current?.reset();
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white">
        <h2 className="text-2xl font-semibold mb-4">Add New WhatsApp Number</h2>
        <p className="text-gray-600 mb-6">Connect your WhatApp account </p>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              id="phoneNumber"
              type="text"
              placeholder="Placeholder"
              value={user.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Description
            </label>
            <input
              name="description"
              id="description"
              type="text"
              placeholder="Placeholder"
              value={user.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
            <p className="mt-2 text-sm text-gray-500">What is this list for?</p>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add Number
          </button>
        </form>
      </div>
    </Modal>
  );
}
