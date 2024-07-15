import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import BroadCastConfigModal from "@/components/broadcast/broadcastConfigModal";
import GroupSelector from "@/components/broadcast/groupSelector";
import ListSelector from "@/components/broadcast/listSelector";
import MessageConfigModal from "@/components/broadcast/messageConfigModal";
import MessageForm from "@/components/broadcast/messageForm";
import Button from "@/components/button/button";
import UserLayout from "@/layout/user";
import { useCreateBroadcastMessage } from "@/providers/hooks/mutate/message";
import { useAccountStore } from "@/providers/stores/accountStore";
import { ICreateBroadcastMessage } from "@/typings/interface/message";
import React, { useState, useEffect, useMemo } from "react";

const defaultValue: ICreateBroadcastMessage = {
  list: [],
  accountId: "",
  text: "",
  type: "",
  tags: [],
  sendToIndividual: false,
  excludeList: [],
  isTest: false,
};

export default function SendBroadast() {
  const [selectedBroadcastTarget, setSelectedBroadcastTarget] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const accounts = useAccountStore((state) => state.accounts);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [clearListFlag, setClearListFlag] = useState<boolean>(false);
  const [clearFileFlag, setClearFileFlag] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateBroadcastMessage>({ ...defaultValue });

  const createMessageMutation = useCreateBroadcastMessage({
    onSuccess: () => {
      setFormData({ ...defaultValue });
      setClearListFlag(true);
      setClearFileFlag(true);
      handleIsClose();
    },
    options: {
      successConfig: {
        title: "Broadcast Message Created",
        text: "The broadcast message has been successfully created.",
      },
      errorConfig: { title: "Failed to Create Broadcast Message" },
    },
  });

  const handleIsClose = () => {
    setIsOpen(false);
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name } = event.target;
    if (name === "type") {
      setSelectedBroadcastTarget(value);
    }
    value != undefined && updateFormState({ name, value });
  }

  const updateFormState = ({ name, value }: { name: string; value: string }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (files: File[]) => {
    formData.files = files;
    setFormData((val) => ({ ...val }));
  };

  const handleSubmit = (isTest = false) => {
    const payload: ICreateBroadcastMessage = {
      ...formData,
      list: selectedId,
      sendToIndividual: Boolean(formData.sendToIndividual),
      isTest,
    };
    createMessageMutation.mutate(payload);
  };

  //to use form validation
  const isValid = useMemo(
    () => !!(selectedId.length && formData.text && formData.accountId && formData.type),
    [formData, selectedId]
  );

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
            <label className="block text-gray-900 font-semibold leading-8 text-sm">Select Account</label>
            <select
              className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
              name="accountId"
              onChange={handleChange}
              value={formData.accountId}
            >
              <option value="" className="px-2">
                {accounts.length ? "Select Account" : "No account available"}
              </option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.phoneNumber}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">Which number are you broadcasting from?</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-900 font-semibold leading-8 text-sm">Broadcast To</label>
            <select
              onChange={(e) => {
                handleChange(e);
                setClearListFlag(true);
              }}
              value={formData.type}
              name="type"
              className="w-full p-2 border border-gray-700 rounded focus:outline-none"
            >
              <option value="">Select broadcast target</option>
              <option value="list">List</option>
              <option value="group">Groups</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Where are you broadcasting to</p>
          </div>
          <div className="col-span-1">
            <label className="block text-gray-900 font-semibold leading-8 text-sm">Template</label>
            <select onChange={handleChange} className="w-full p-2 border border-gray-700 rounded focus:outline-none">
              <option value="">No Template</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">are you using a template?</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-8">
          <div>
            <MessageForm
              onChange={updateFormState}
              broadcastType={formData.type}
              formValue={formData.text}
              clearFlag={clearFileFlag}
              updateClearFlag={setClearFileFlag}
              onFileUpload={handleFileUpload}
            />
            <div className="">
              <Button disabled={!isValid} onClick={handleIsOpen} primary className="px-4 py-2 rounded w-full">
                Proceed
              </Button>
            </div>
          </div>
          <div>
            {formData.type == "list" && (
              <ListSelector
                key={formData.type + "_listSelector"}
                setValue={setSelectedId}
                clearFlag={clearListFlag}
                updateClearFlag={setClearListFlag}
              />
            )}

            {formData.type == "group" && (
              <GroupSelector
                key={`${formData.accountId}_groupSelector`}
                setValue={setSelectedId}
                accountId={formData.accountId}
                clearFlag={clearListFlag}
                updateClearFlag={setClearListFlag}
              />
            )}
          </div>
        </section>

        {isOpen && (
          <MessageConfigModal
            onChange={updateFormState}
            onClose={handleIsClose}
            onSubmit={handleSubmit}
            formData={formData}
            isOpen={isOpen}
          />
        )}
      </div>
    </UserLayout>
  );
}
