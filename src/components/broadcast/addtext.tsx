import Button from "@/components/button/button";
import { NotificationType } from "@/core/enum/notification";
import { useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ContactAccount } from "@/typings/interface/account";
import {  IBroadcastLists,  ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { Contact } from "@/typings/interface/contacts";
import { FormEvent, useState } from "react";

interface IProps {
  selectedContacts: ContactAccount[];
  handleClose: () => void;
  selectedBroadcastList: IBroadcastLists;

}

export default function AddExistingBroadcastList(props: IProps) {
  const { selectedContacts, handleClose, selectedBroadcastList} = props;
  const setNotification = useNotificationStore((state) => state.setDisplay);


  const { mutate: createFromExistingList, isLoading: createFromExistingLoader } = useCreateContactList({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Contact List Updated successfully",
          text: `you added ${selectedContacts.length} contacts to ${selectedBroadcastList?.listName} list`,
        },
      });
      handleClose();
    },
  });

  const addToExistingList = (event: FormEvent) => {
    event.preventDefault();

    const contacts: Contact[] = selectedContacts.map((item) => ({
      contactName: item.name ?? "NA",
      contactEmail: "",
      contactPhoneNumber: item?.phoneNumber ?? "NA",
    }));

    selectedBroadcastList &&
      createFromExistingList({
        contacts,
        broadcastListId: selectedBroadcastList.id,
      });
  };

  return (
    <div>
      <form onSubmit={addToExistingList} className=" mt-10 relative ">
        <div>
          <h2 className="font-bold text-[1.3rem]">Add {selectedContacts.length} contacts to an existing list</h2>
          <p className="text-[1rem] text-wrap pr-4 ">
            {selectedContacts.length} contacts you have selected would be added to an existing broadcast list{" "}
          </p>
        </div> 

        <div className={`mt-5 relative `}>
          <Button
            primary
            className="w-full"
            type="submit"
          >
            {!createFromExistingLoader ? `Add ${selectedContacts.length} Contacts` : "Loading..."}
          </Button>
        </div>
      </form>
    </div>
  );
}
