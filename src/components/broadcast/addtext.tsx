import Button from "@/components/button/button";
import { NotificationType } from "@/core/enum/notification";
import { useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ContactAccount } from "@/typings/interface/account";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { Contact } from "@/typings/interface/contacts";
import { FormEvent, useState } from "react";

interface IProps {
  selectedContacts: ContactAccount[];
  handleClose: () => void;
  selectedBroadcastList: IBroadcastLists;
  selectedAutomationDay?: number;
}

export default function AddExistingBroadcastList(props: IProps) {
  const { selectedContacts, handleClose, selectedAutomationDay, selectedBroadcastList } = props;
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
        automatedDay: selectedAutomationDay ?? 0,
        contacts,
        broadcastListId: selectedBroadcastList.id,
      });
  };

  return (
    <div>
      <form onSubmit={addToExistingList} className=" mt-10 relative ">
        <div>
          <h2 className="font-bold text-[1.3rem]">Add {selectedContacts.length} contacts</h2>
          <p className="text-[1rem] text-wrap pr-4 ">
            The {selectedContacts.length} contacts you have selected will be added to the{" "}
            {selectedBroadcastList.listName} list
          </p>
        </div>

        <div className={`mt-5 relative `}>
          <Button primary className="w-full" type="submit">
            {!createFromExistingLoader ? `Add ${selectedContacts.length} Contacts` : "Loading..."}
          </Button>
        </div>
      </form>
    </div>
  );
}
