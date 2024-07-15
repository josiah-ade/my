import Button from "@/components/button/button";
import { NotificationType } from "@/core/enum/notification";
import { useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ContactAccount } from "@/typings/interface/account";
import { IBroadcastLists, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { Contact } from "@/typings/interface/contacts";
import { FormEvent, useState } from "react";

interface IProps {
  selectedContacts: ContactAccount[];
  handleClose: () => void;
  broadcastList: IBroadcastLists[];
}

const defaultCreateBroadcastFormValue: ICreateBroadcastList = {
  listName: "",
  description: "",
  automationDay: 0,
};
export default function AddExistingList(props: IProps) {
  const { selectedContacts, handleClose, broadcastList } = props;
  const setNotification = useNotificationStore((state) => state.setDisplay);

  const [selectedBroadcastList, setSelectedBroadcastList] = useState<IBroadcastLists>();

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

  const [createBroadcastListData, setCreateBroadcastListData] = useState<ICreateBroadcastList>({
    ...defaultCreateBroadcastFormValue,
  });

  const updateSelectedBroadcastList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!broadcastList?.length) return;
    const index = e.currentTarget.value;
    setSelectedBroadcastList(broadcastList[parseInt(index)]);
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setCreateBroadcastListData({ ...createBroadcastListData, [name]: value });
  }
  const addToExistingList = (event: FormEvent) => {
    event.preventDefault();

    const contacts: Contact[] = selectedContacts.map((item) => ({
      contactName: item.name ?? "NA",
      contactEmail: "",
      contactPhoneNumber: item?.phoneNumber ?? "NA",
    }));

    const { automationDay } = createBroadcastListData;

    selectedBroadcastList &&
      createFromExistingList({
        automatedDay: automationDay ?? 0,
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
          <label className="font-bold">Select List</label>
          <br></br>
          <div className="mt-2">
            <select
              name="name"
              autoComplete="off"
              onChange={updateSelectedBroadcastList}
              className="pl-[10px]   rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
            >
              <p> No BroadcastList</p>
              <option> Select A BroadcastList</option>
              {broadcastList?.map((item, index) => (
                <option value={index} key={item.id}>
                  {item.listName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={`mt-5 relative `}>
          <label className="font-bold">Day Number on Automation</label>
          <br></br>
          <div className="mt-2">
            <input
              name="automationDay"
              type="number"
              placeholder="Day Number on Automation"
              onChange={handleChange}
              value={createBroadcastListData.automationDay}
              className="pl-[10px]  rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className={`mt-5 relative `}>
          <Button
            primary
            className="w-full"
            type="submit"
            disabled={!selectedBroadcastList?.id || createFromExistingLoader}
          >
            {!createFromExistingLoader ? `Add ${selectedContacts.length} Contacts` : "Loading..."}
          </Button>
        </div>
      </form>
    </div>
  );
}
