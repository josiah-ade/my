import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import { ICreateAccount } from "@/typings/interface/account";
import { useEffect, useRef, useState } from "react";
import { useCreateAccount } from "@/providers/hooks/mutate/account";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import PhoneInput from "../input/phoneInput";
import TextInput from "../input/textInput";
import { CreateAccountSchema } from "@/providers/schema/account/account.schema";
import { formatZodErrors } from "@/core/formatters/zodError.formatter";

interface IProps extends ModalProps {}

const defaultValue: ICreateAccount = {
  phoneNumber: "",
  description: "",
  countryCode: "",
};

export default function AddAccountModal({ isOpen, onClose }: IProps) {
  const setNotification = useNotificationStore((state) => state.setDisplay);
  const [formError, setFormError] = useState<Record<string, string>>({});
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

  const handleChange = (name: keyof ICreateAccount, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError({});

    const result = CreateAccountSchema.safeParse(user);
    if (!result.success) {
      setFormError(formatZodErrors(result.error));
      return;
    }
    const { phoneNumber, countryCode, ...data } = user;
    createAccount({ ...data, phoneNumber: `${countryCode}${phoneNumber}` });
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" ref={formRef}>
          <PhoneInput
            name="phoneNumber"
            label="Phone Number*"
            placeholder="Input Phone Number"
            value={user.phoneNumber}
            codeValue={user.countryCode}
            errorText={formError.phoneNumber}
            onChange={(val) => handleChange("phoneNumber", val)}
            onCodeChange={(val) => handleChange("countryCode", val)}
          />

          <TextInput
            name="description"
            label="Description*"
            value={user.description}
            errorText={formError.description}
            placeholder="Description"
            onChange={(val) => handleChange("description", val)}
          />
          <button
            type="submit"
            className="w-full bg-primary-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Add Number
          </button>
        </form>
      </div>
    </Modal>
  );
}
