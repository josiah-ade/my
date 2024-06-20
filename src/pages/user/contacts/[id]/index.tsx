import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import Tabs from "@/components/tab/Tab";
import Table from "@/components/table/table";
import { TableHeader } from "@/core/types/data.interface";
import UserLayout from "@/layout/user";
import { FormEvent, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import { useGetSingleUsersAcount, useGetUsersContactAcount } from "@/providers/hooks/query/getaccount";
import HasBack from "@/components/common/hasback/hasback";
import { ContactAccount } from "@/typings/interface/account";
import { useParams } from "next/navigation";
import { IBroadcastList, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import { useCreateContactFromNewList, useCreateContactList } from "@/providers/hooks/mutate/createcontact";
import { Contact } from "@/typings/interface/contacts";

const defaultCreateBroadcastFormValue: ICreateBroadcastList = {
  listName: "",
  description: "",
  dayNumber: 0,
};

export default function ContactPage() {
  const { id } = useParams();
  const { data: contactAcount } = useGetUsersContactAcount(id as string);
  const { data: accountDetails } = useGetSingleUsersAcount(id as string);
  const { data: broadcastList } = useGetUserBroadcast();

  const { mutate: createFromExistingList, isLoading: createFromExistingLoader } = useCreateContactList({
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      handleClose();
    },
  });

  const { mutate: createFromNewList, isLoading: createFromNewLoader } = useCreateContactFromNewList({
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      handleClose();
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  const [selectedContacts, setSelectedContacts] = useState<ContactAccount[]>([]);
  const [selectedBroadcastList, setSelectedBroadcastList] = useState<IBroadcastList>();

  const [createBroadcastListData, setCreateBroadcastListData] = useState<ICreateBroadcastList>({
    ...defaultCreateBroadcastFormValue,
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setCreateBroadcastListData({ ...createBroadcastListData, [name]: value });
    // console.log({ data });
  }

  const updateSelectedBroadcastList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!broadcastList?.length) return;
    const index = e.currentTarget.value;
    setSelectedBroadcastList(broadcastList[parseInt(index)]);
  };

  const handleModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const addToExistingList = (event: FormEvent) => {
    event.preventDefault();

    const contacts: Contact[] = selectedContacts.map((item) => ({
      contactName: item.name ?? "NA",
      contactEmail: "",
      contactPhoneNumber: item.phoneNumber ?? "NA",
    }));

    selectedBroadcastList && createFromExistingList({ contacts, broadcastListId: selectedBroadcastList.id });
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

  const resetFormValue = () => {
    setCreateBroadcastListData((val) => ({ ...defaultCreateBroadcastFormValue }));
  };

  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "Phone Number" },
    { field: "country", title: "Country" },
    { field: "name", title: "Name" },
  ];

  const tabs = [
    {
      label: "Add to a New List",
      icon: <IoAddCircleOutline />,
      content: (
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
              disabled={
                !(createBroadcastListData.listName && createBroadcastListData.description) || createFromNewLoader
              }
              className="w-full"
              type="submit"
            >
              {!createFromNewLoader ? `Create and Add ${selectedContacts.length} Contacts` : "Loading..."}
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Add to an Existing List",
      icon: <MdOutlinePostAdd />,
      content: (
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
                name="dayNumber"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={createBroadcastListData.dayNumber}
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
      ),
    },
  ];

  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-3">
          <HasBack hasBack={true} title={"GoBack"} />
        </div>
        <div className="mt-5 flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-2xl"> {accountDetails?.phoneNumber ?? ""} </h1>
            <p className="mt-2">View all your contacts for this account</p>
          </div>
          <div>
            <Button onClick={handleModal} disabled={!selectedContacts.length} primary icon={<GoPlus />}>
              Add to List
            </Button>
          </div>
        </div>
        <div className="mt-5">
          {contactAcount ? (
            <Table headers={headers} data={contactAcount} checkboxAction={(val) => setSelectedContacts([...val])} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Tabs onTabChange={resetFormValue} tabs={tabs} />
      </Modal>

      {/* <Notification
        message={"Contact List Updated successfully"}
        description={"you added 232 contacts to New Customers Broadcast list"}
        onClose={handleClose}
      /> */}
    </UserLayout>
  );
}
