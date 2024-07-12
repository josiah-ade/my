import React, { useState, ChangeEvent, FormEvent } from "react";
import ContactsList from "../contactlist/contactlist";
import Default from "../default/default";
import Button from "../button/button";
import { NotificationType } from "@/core/enum/notification";
import useNotificationStore from "@/providers/stores/notificationStore";
import { Contact } from "@/typings/interface/contacts";
import { useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import { IBroadcastContact, IBroadcastLists } from "@/typings/interface/broadcasts";

interface IProps {
  selectedValue?: IBroadcastLists;
  contacts?: IBroadcastContact[];
}

const defaultValue: Contact = { contactName: "", contactEmail: "", contactPhoneNumber: "" };

export default function Manually(props: IProps) {
  const { selectedValue } = props;
  const [contactListData, setContactListData] = useState<Contact>({ ...defaultValue });

  const setNotification = useNotificationStore((state) => state.setDisplay);
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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
      handleClose();
    },
  });

  const handleOnSubmit = (event: FormEvent) => {
    event.preventDefault();

    selectedValue &&
      createFromExistingList({
        contacts: [contactListData],
        broadcastListId: selectedValue.id,
      });
  };

  return (
    <section className="mt-20 overflow-x-hidden">
      <div className="block lg:flex">
        <div className="bg-white w-full lg:w-[40%]">
          <h2 className="text-xl font-bold">Import Contacts manually</h2>
          <p className="text-gray-600 text-base">Manually type contact details to be imported</p>
          <form className="space-y-4 mt-8" onSubmit={handleOnSubmit}>
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Contact Name*
                <input onChange={handleChange} name="contactName" placeholder="input name" />
              </label>
            </div>
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Phone Number*
                <input
                  onChange={handleChange}
                  value={contactListData.contactPhoneNumber}
                  type="text"
                  name="contactPhoneNumber"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="input phone"
                />
              </label>
            </div>
            <div>
              <label className="block text-gray-900 font-semibold leading-8 text-sm">
                Contact email
                <input
                  onChange={handleChange}
                  value={contactListData.contactEmail}
                  type="email"
                  name="contactEmail"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm"
                  placeholder="input email"
                />
              </label>
            </div>
            <div className="mt-2">
              <Button
                disabled={Object.values(contactListData).length < 1}
                type="submit"
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
                alt="No Source Selelcted"
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
