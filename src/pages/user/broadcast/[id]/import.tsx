import React, { useState, ChangeEvent, useEffect } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import Image from "next/image";
import Manually from "@/components/imports/manually";
import Google from "@/components/imports/google";
import Whatsapp from "@/components/imports/whatsapp";
import CSV from "@/components/imports/csv";
import { useGetBroadcastContact } from "@/providers/hooks/query/getcontact";

import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { useAccountStore } from "@/providers/stores/accountStore";
import { useParams } from "next/navigation";
import GoogleSignInButton from "@/components/contacts/googleSignInButton";

export default function ImportContacts() {
  const { id } = useParams() ?? {};
  const accounts = useAccountStore((state) => state.accounts);
  const [selectedBroadcastList, setSelectedBroadcastList] = useState<IBroadcastLists>();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [automationDay, setAutomationDay] = useState(0);

  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [accountSelectedId, setAccountSelectedId] = useState<string>("");

  const { data: contacts } = useGetBroadcastContact(selectedBroadcastList?.id ?? "", {
    enabled: !!selectedBroadcastList?.id && selectedValue == "manually",
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    accountSelectedId && setAccountSelectedId("");
  };

  const handleAutomationDayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value || value == 0) setAutomationDay(value);
  };

  const handleAccountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAccount = accounts[parseInt(event.target.value)];
    setAccountSelectedId(selectedAccount ? selectedAccount.id : "");
  };
  const listIndex = broadcastList.findIndex((val) => val.id == id);

  const updateSelectedBroadcastList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = e.currentTarget.value;
    if (index === "default" || !broadcastList?.length) {
      setSelectedBroadcastList(broadcastList[parseInt(index)]);
      setIsButtonEnabled(false);
      return;
    }
    const selectedList = broadcastList[parseInt(index, 10)];
    setSelectedBroadcastList(selectedList);
    setIsButtonEnabled(true);
  };
  useEffect(() => {
    if (listIndex !== undefined && broadcastList?.[listIndex]) {
      setSelectedBroadcastList(broadcastList[listIndex]);
      setIsButtonEnabled(true);
    }
  }, [listIndex, broadcastList]);

  return (
    <UserLayout>
      <section>
        <Breadcrumb />
        <div className="overflow-x-hidden">
          <div className="bg-white mt-5 rounded-lg w-full">
            <div className="block md:flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-black">Import Contacts into a broadcast list</h2>
                <p className=" text-gray-600 text-base">Import all your contacts here</p>
              </div>
              <div className="flex items-center space-x-2 mt-8 md:mt-0">
                <GoogleSignInButton />
              </div>
            </div>
            <div
              className={`grid ${
                selectedValue === "whatsapp" ? "md:grid-cols-4" : "md:grid-cols-3"
              } grid-cols-1  gap-4 mt-12`}
            >
              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">Select Source</label>
                <select
                  className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
                  onChange={handleChange}
                >
                  <option value="" className="px-2">
                    Select source
                  </option>
                  <option value="manually">Import Manually</option>
                  <option value="whatsapp">Whatsapp Phone Contacts</option>
                  <option value="google">Google Contacts</option>
                  <option value="csv">Import CSV</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">where are you importing from?</p>
              </div>

              {selectedValue === "whatsapp" && (
                <div className="col-span-1">
                  <label className="block text-gray-900 font-semibold leading-8 text-sm">Account</label>
                  <select
                    className="w-full p-2 px-2 border border-gray-700 rounded focus:outline-none"
                    onChange={handleAccountChange}
                  >
                    <option value="" className="hidden">
                      Select account
                    </option>
                    {accounts
                      ?.filter((item) => item.status == "connected")
                      .map((item, idx) => (
                        <option value={idx} key={item.id} className="px-2">
                          {item?.phoneNumber}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">Select Broadcast List</label>
                <select
                  onChange={updateSelectedBroadcastList}
                  defaultValue={listIndex}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none"
                >
                  <option value="default" className="hidden">
                    Select List
                  </option>
                  {broadcastList?.map((item, index) => (
                    <option value={index} key={item.id}>
                      {item.listName}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">The list you are importing into?</p>
              </div>
              <div className="col-span-1">
                <label className="block text-gray-900 font-semibold leading-8 text-sm">Day Number on Automation</label>
                <input
                  type="number"
                  name="automationDay"
                  onChange={handleAutomationDayChange}
                  className="w-full p-2 border border-gray-700 rounded focus:outline-none"
                  defaultValue={0}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedValue !== "" ? (
          <section>
            {selectedValue === "manually" && (
              <Manually
                selectedValue={selectedBroadcastList}
                selectedAutomationDay={automationDay}
                contacts={contacts}
                isButtonEnabled={isButtonEnabled}
              />
            )}
            {selectedValue === "google" && (
              <Google selectedAutomationDay={automationDay} selectedList={selectedBroadcastList} />
            )}
            {selectedValue === "whatsapp" && (
              <Whatsapp
                selectedAutomationDay={automationDay}
                selectedList={selectedBroadcastList}
                accountId={accountSelectedId}
              />
            )}
            {selectedValue === "csv" && (
              <CSV selectedAutomationDay={automationDay} selectedList={selectedBroadcastList} />
            )}
          </section>
        ) : (
          <section className="my-20">
            <Default
              src="/book.png"
              alt="No Source Selected"
              height={100}
              width={100}
              mainText="No Source Selected"
              subText="Select a source you are importing your contacts from to begin"
            />
          </section>
        )}
      </section>
    </UserLayout>
  );
}
