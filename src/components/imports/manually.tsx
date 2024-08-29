import React, { useState, FormEvent, useMemo } from "react";
import ContactsList from "../contactlist/contactlist";
import Default from "../default/default";
import Button from "../button/button";
import { NotificationType } from "@/core/enum/notification";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ICreateContact } from "@/typings/interface/contacts";
import { useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import { IBroadcastContact, IBroadcastLists } from "@/typings/interface/broadcasts";
import TextInput from "../input/textInput";
import { ContactSchema } from "@/providers/schema/broadcast/contact.schema";
import { formatZodErrors } from "@/core/formatters/zodError.formatter";
import PhoneInput from "../input/phoneInput";
import { FaSackDollar } from "react-icons/fa6";

interface IProps {
  selectedValue?: IBroadcastLists;
  selectedAutomationDay?: number;
  contacts?: IBroadcastContact[];
}

const defaultValue: ICreateContact = { contactName: "", contactEmail: "", contactPhoneNumber: "", countryCode: "" };

export default function Manually(props: IProps) {
  const { selectedValue, selectedAutomationDay } = props;
  const [contactListData, setContactListData] = useState<ICreateContact>({ ...defaultValue });
  const [formError, setFormError] = useState<Record<string, string>>({});

  const setNotification = useNotificationStore((state) => state.setDisplay);

  const handleChange = (name: keyof ICreateContact, value: string) => {
    setContactListData({ ...contactListData, [name]: value });
  };

  const { mutate: createFromExistingList, isLoading: createFromExistingLoader } = useCreateContactList({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Contact Imported",
          text: `The contact ${contactListData.contactPhoneNumber} was imported successfully`,
        },
      });
      setContactListData({ ...defaultValue });
    },
  });

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormError({});

    const result = ContactSchema.safeParse(contactListData);
    if (!result.success) {
      setFormError(formatZodErrors(result.error));
      return;
    }

    const { contactPhoneNumber, countryCode, ...data } = contactListData;

    selectedValue &&
      createFromExistingList({
        automatedDay: selectedAutomationDay ?? 0,
        contacts: [{ ...data, contactPhoneNumber: `${countryCode}${contactPhoneNumber}` }],
        broadcastListId: selectedValue.id,
      });
  };

  // const isValid = useMemo(() => {
  //   const result = ContactSchema.safeParse(contactListData);
  //   return result.success;
  // }, [contactListData]);

  return (
    <section className="mt-20 overflow-x-hidden">
      <div className="block lg:flex">
        <div className="bg-white w-full lg:w-[40%]">
          <h2 className="text-xl font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-base">Manually type contact details to be imported</p>
          <form className="space-y-4 mt-8" onSubmit={handleOnSubmit}>
            <TextInput
              name="contactName"
              label="Contact Name*"
              placeholder="Input Name"
              value={contactListData.contactName}
              errorText={formError.contactName}
              onChange={(val) => handleChange("contactName", val)}
            />

            <PhoneInput
              name="phoneNumber"
              label="Phone Number*"
              placeholder="Input Phone Number"
              value={contactListData.contactPhoneNumber}
              codeValue={contactListData.countryCode}
              errorText={formError.contactPhoneNumber}
              onChange={(val) => handleChange("contactPhoneNumber", val)}
              onCodeChange={(val) => handleChange("countryCode", val)}
            />

            <TextInput
              name="contactEmail"
              label="Contact Email*"
              value={contactListData.contactEmail}
              errorText={formError.contactEmail}
              placeholder="Input Email"
              onChange={(val) => handleChange("contactEmail", val)}
            />
            <div className="mt-2">
              <Button
                type="submit"
                primary
                disabled={!selectedValue}
                className="w-full flex justify-center  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 hover:bg-gray-500"
              >
                Import
              </Button>
            </div>
          </form>
        </div>
        <div className={`bg-gray-50 w-full flex lg:w-[60%] min-h-40  md:ml-8`}>
          {selectedValue ? (
            <section className="p-4 w-full">
              <ContactsList contacts={props.contacts ?? []} selectedValue={selectedValue} />
            </section>
          ) : (
            <section>
              <Default
                src="/book.png"
                alt="No Source Selected"
                height={100}
                width={100}
                mainText="Select a Broadcast List"
                subText="Select a source you are importing your contacts from to begin"
              />
            </section>
          )}
        </div>
      </div>
    </section>
  );
}
