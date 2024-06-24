import Button from "@/components/button/button";
import { NotificationType } from "@/core/enum/notification";
import { useCreateContactFromNewList } from "@/providers/hooks/mutate/createcontact";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ContactAccount } from "@/typings/interface/account";
import { IBroadcastList, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { Contact } from "@/typings/interface/contacts";
import { FormEvent, useState } from "react";

const defaultCreateBroadcastFormValue: ICreateBroadcastList = {
  listName: "",
  description: "",
  dayNumber: 0,
};

interface IProps {
  selectedContacts: ContactAccount[];
  handleClose: () => void;
}

export default function AddNewList(props: IProps) {
  const { selectedContacts, handleClose } = props;
  const setNotification = useNotificationStore((state) => state.setDisplay);

  const [createBroadcastListData, setCreateBroadcastListData] = useState<ICreateBroadcastList>({
    ...defaultCreateBroadcastFormValue,
  });

  const { mutate: createFromNewList, isLoading: createFromNewLoader } = useCreateContactFromNewList({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: {
          title: "Contact List Updated successfully",
          text: `you added ${selectedContacts.length} contacts to ${createBroadcastListData.listName} list`,
        },
      });
      handleClose();
    },
    options: {
      successConfig: {
        displaySuccess: false,
      },
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setCreateBroadcastListData({ ...createBroadcastListData, [name]: value });
  };
  const addToNewList = (event: FormEvent) => {
    event.preventDefault();

    const contacts: Contact[] = selectedContacts.map((item) => ({
      contactName: item.name ?? "NA",
      contactEmail: "",
      contactPhoneNumber: item.phoneNumber ?? "",
    }));

    createFromNewList({ contacts, broadcast: createBroadcastListData });
  };

  return (
    <div>
      <form onSubmit={addToNewList} className=" mt-5 relative ">
        <div>
          <h2 className="font-bold text-[1.3rem]">Add {selectedContacts.length} contacts to a new list</h2>
          <p className="text-sm text-wrap pr-4 ">
            {selectedContacts.length} contacts you have selected would be added to a new broadcast list{" "}
          </p>
        </div>
        <div className={`mt-5 relative `}>
          <label className="font-bold">List Name</label>
          <br></br>
          <div className="mt-2">
            <input
              name="listName"
              autoComplete="off"
              placeholder="Enter List Name"
              onChange={handleChange}
              value={createBroadcastListData.listName}
              className="pl-[10px]  rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className={`mt-5 relative `}>
          <label className="font-bold">Description</label>
          <br></br>
          <div className="mt-2">
            <input
              name="description"
              autoComplete="off"
              placeholder="Enter Description"
              onChange={handleChange}
              value={createBroadcastListData.description}
              className="pl-[10px]  rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="text-primary-4 mt-3">
          <p>what is this list for?</p>
        </div>
        <div className={`mt-5 relative `}>
          <label className="font-bold">Day Number on Automation</label>
          <br></br>
          <div className="mt-2">
            <input
              name="dayNumber"
              autoComplete="off"
              placeholder="Enter Number on Automation"
              onChange={handleChange}
              value={createBroadcastListData.dayNumber}
              className="pl-[10px]   rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className={`mt-5 relative `}>
          <Button
            primary
            disabled={!(createBroadcastListData.listName && createBroadcastListData.description) || createFromNewLoader}
            className="w-full"
            type="submit"
          >
            {!createFromNewLoader ? `Create and Add ${selectedContacts.length} Contacts` : "Loading..."}
          </Button>
        </div>
      </form>
    </div>
  );
}
