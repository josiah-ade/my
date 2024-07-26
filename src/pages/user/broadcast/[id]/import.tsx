import React, { useState, ChangeEvent, useEffect } from "react";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
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
import Select from "@/components/input/selectInput";
import TextInput from "@/components/input/textInput";

const ImportSource = [
  { label: "Import Manually", value: "manually" },
  { label: "Whatsapp Phone Contacts", value: "whatsapp" },
  { label: "Google Contacts", value: "google" },
  { label: "Import CSV", value: "csv" },
];

export default function ImportContacts() {
  const { id } = useParams() ?? {};
  const accounts = useAccountStore((state) => state.accounts);
  const [selectedBroadcastList, setSelectedBroadcastList] = useState<IBroadcastLists | undefined>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [automationDay, setAutomationDay] = useState(0);

  const broadcastList = useBroadcastStore((state) => state.broadcasts);
  const [accountSelectedId, setAccountSelectedId] = useState<string>("");

  const { data: contacts } = useGetBroadcastContact(selectedBroadcastList?.id ?? "", {
    enabled: !!selectedBroadcastList?.id && selectedValue == "manually",
  });

  const updateSource = (value: string) => {
    setSelectedValue(value);
    accountSelectedId && setAccountSelectedId("");
  };

  useEffect(() => {
    if (id) setSelectedBroadcastList(broadcastList.find((item) => item.id == id));
  }, [id]);

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
            <div className=" grid sm:grid-cols-[repeat(auto-fit,minmax(15.88rem,1fr))] mt-12 gap-[1.88rem] ">
              <Select
                name="Source"
                label="Select Source"
                inputClass="py-2.5 px-1"
                hintText="where are you importing from?"
                hintClass="text-sm text-gray-500 mt-2"
                onChange={updateSource}
                options={ImportSource}
                controlField={"value"}
                displayField={"label"}
              />

              {selectedValue === "whatsapp" && (
                <Select
                  name="Account"
                  label="Account"
                  inputClass="py-2.5 px-1"
                  onChange={setAccountSelectedId}
                  options={accounts.filter((item) => item.status == "connected")}
                  controlField={"id"}
                  displayField={"phoneNumber"}
                />
              )}

              <Select
                name="Broadcast List"
                label="Select Broadcast List"
                inputClass="py-2.5 px-1"
                onSelect={setSelectedBroadcastList}
                value={selectedBroadcastList?.id}
                options={broadcastList}
                controlField={"id"}
                hintText="The list you are importing into?"
                displayField={"listName"}
              />

              <TextInput
                name="automationDay"
                inputClass="py-2 px-1"
                label="Day Number on Automation"
                type="number"
                value={`${automationDay}`}
                onChange={(val) => setAutomationDay(parseInt(val))}
              />
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
                // isButtonEnabled={isButtonEnabled}
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
