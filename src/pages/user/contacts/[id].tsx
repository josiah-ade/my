import Button from "@/components/button/button";
import CreateForm from "@/components/common/actions/form/createform";
import Modal from "@/components/modal/modal";
import Tabs from "@/components/tab/Tab";
import Table from "@/components/table/table";
import { Qr, Home } from "@/core/const/icons/icons";
import { TableHeader, AccountData } from "@/core/types/data.interface";
import UserLayout from "@/layout/user";
// import Home from "@/pages";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import profile from "@/assets/profile.png";
import { useRouter } from "next/router";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import Notification from "@/components/notification/notification";

interface IAdd {
  name: string;
  description: string;
  automation: string;
}

export default function ContactPage() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [add, setAdd] = useState<IAdd>({
    name: "",
    description: "",
    automation: "",
  });
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setAdd({ ...add, [name]: value });
    // console.log({ data });
  }

  const handleModal = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const headers: TableHeader[] = [
    { field: "whatsAppNumber", title: "Phone Number" },
    { field: "purpose", title: "Country" },
    { field: "plan", title: "Name" },
  ];
  const data: AccountData[] = [
    {
      whatsAppNumber: "+234 915 632 9332",
      purpose: "For RJStores",
      plan: "Free Plan",
      img: profile,
      expiry: "",
      serviceStatus: "",
    },
    {
      whatsAppNumber: "+234 915 632 9332",
      purpose: "For RJStores",
      plan: "Free Plan",
      img: profile,
      expiry: "",
      serviceStatus: "",
    },
    {
      whatsAppNumber: "+234 915 632 9332",
      purpose: "For RJStores",
      plan: "Free Plan",
      img: profile,
      expiry: "",
      serviceStatus: "",
    },
    {
      whatsAppNumber: "+234 915 632 9332",
      purpose: "For RJStores",
      plan: "Free Plan",
      img: profile,
      expiry: "",
      serviceStatus: "",
    },
  ];

  const tabs = [
    {
      label: "Add to a New List",
      icon: <IoAddCircleOutline />,
      content: (
        <form className=" mt-5 relative ">
          <div>
            <h2 className="font-bold text-[1.3rem]">Add 384 contacts to a new list</h2>
            <p className="text-[1rem] text-wrap w-full max-w-[300px] ">
              384 contacts you have selected would be added to a new broadcast list{" "}
            </p>
          </div>
          <div className={`mt-5 relative `}>
            <label className="font-bold">List Name</label>
            <br></br>
            <div className="mt-2">
              <input
                name="name"
                autoComplete="off"
                placeholder="Enter List Name"
                onChange={handleChange}
                value={add.name}
                className="pl-[10px]  rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className={`mt-5 relative `}>
            <label className="font-bold">Description</label>
            <br></br>
            <div className="mt-2">
              <input
                name="name"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={add.name}
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
                name="name"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={add.name}
                className="pl-[10px]   rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className={`mt-5 relative `}>
            <Button primary className="w-full">
              Create and Add 384 Contacts
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Add to an Existing List",
      icon: <MdOutlinePostAdd />,
      content: (
        <form className=" mt-10 relative ">
          <div>
            <h2 className="font-bold text-[1.3rem]">Add 384 contacts to an existing list</h2>
            <p className="text-[1rem] text-wrap w-full max-w-[300px] ">
              384 contacts you have selected would be added to an existing broadcast list{" "}
            </p>
          </div>
          <div className={`mt-5 relative `}>
            <label className="font-bold">Select List</label>
            <br></br>
            <div className="mt-2">
              <input
                name="name"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={add.name}
                className="pl-[10px]   rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className={`mt-5 relative `}>
            <label className="font-bold">Day Number on Automation</label>
            <br></br>
            <div className="mt-2">
              <input
                name="name"
                autoComplete="off"
                placeholder="Enter business email"
                onChange={handleChange}
                value={add.name}
                className="pl-[10px]  rounded-[6px] px-3 py-5 w-[100%] bg-white outline-gray-400 border focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <div className={`mt-5 relative `}>
            <Button primary className="w-full">
              Add 384 Contacts
            </Button>
          </div>
        </form>
      ),
    },
  ];
  return (
    <UserLayout>
      <div>
        <div className="mt-5 flex flex-row justify-between">
          <div>
            <h1 className="font-bold text-2xl">Imported Contacts</h1>
            <p className="mt-2">View all your contacts here</p>
          </div>
          <div>
            <Button onClick={handleModal} primary icon={<GoPlus />}>
              Add to List
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <Table headers={headers} data={data} />
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Tabs tabs={tabs} />
      </Modal>

      <Notification
        message={"Contact List Updated successfully"}
        description={"you added 232 contacts to New Customers Broadcast list"}
        onClose={handleClose}
      />
    </UserLayout>
  );
}
