import React, { useState } from "react";
import Image from "next/image";
import Contact from "@/components/contacts/contacts";
import Modal from "@/components/modal/modal";
import UserLayout from "@/layout/user";
import Button from "@/components/button/button";
import { GoPlus } from "react-icons/go";
import Table from "../../components/table";
import Tabs from "@/components/tab/Tab";
import {
  Bin,
  Qr,
  Circle,
  Message,
  Hash,
  Repeat,
  Home,
  Link,
  Plus,
} from "@/core/const/icons/icons";
import { AccountData, Data, TableHeader } from "@/core/types/data.interface";
import Default from "@/components/default/default";
import { IAccount,ICreateAccount } from "@/typings/interface/account";
import { useCreateAccount } from "@/providers/hooks/mutate/createaccount";
import {
  useGetQrcodeUsersAcount,
  useGetUsersAcount,
} from "@/providers/hooks/query/getaccount";
import router, { useRouter } from "next/router";
import TabContent from "@/components/tab/tabcontent";
import PairQrcode from "@/components/tab/tabpairingcode";
import EmptyState from "@/components/common/empty/empty";

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<IAccount>();
  const [open, setOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [user, setUser] = useState<ICreateAccount>({
    phoneNumber: "",
    description: "",
  });
  const { mutate: createAccount, isLoading } = useCreateAccount({
    onError(error) {
      console.error(error);
    },
    onSuccess() {
      setOpen(false);
    },
  });
  console.log(createAccount);
  const { data: accounts, loading } = useGetUsersAcount();
  console.log(accounts);
  const router = useRouter();
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
    console.log({ user });
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (user) {
    //   if (!user.id) {
    //     console.error("User ID is required.");
    //     return;
    //   }
    // }
    createAccount(user);
    console.log("this is user", user);
  };

  const openFuc = (currentValue: IAccount) => {
    setIsOpen(!!currentValue);
    setCurrentAccount(currentValue);
  };

  const closeFunc = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const headers: TableHeader[] = [
    { field: "phoneNumber", title: "WhatsApp Number" },
    { field: "description", title: "Purpose" },
    { field: "plan", title: "Plan" },
    { field: "expiry", title: "Expiry" },
    { field: "serviceStatus", title: "Service Status" },
  ];
  // const data: Contact[] = [];
  const actions: Data[] = [
    { text: "Link with pairing code", icon: <Link className="h-4 w-4" /> },
    { text: "Link with QR code", icon: <Qr className="h-4 w-4" /> },
    { text: "Disconnect", icon: <Circle className="h-4 w-4" /> },
    { text: "Send test message", icon: <Message className="h-4 w-4" /> },
    { text: "Unsubscribe Keyword", icon: <Hash className="h-4 w-4" /> },
    {
      text: "Trigger Word To Move To Another List",
      icon: <Hash className="h-4 w-4" />,
    },
    { text: "Transfer License", icon: <Repeat className="h-4 w-4" /> },
    { text: "Delete", icon: <Bin className="h-4 w-4 text-red-600" /> },
  ];

  const tabs = [
    {
      label: "Link with Pairing Code",
      icon: <Home />,
      content: <PairQrcode />
    },
    {
      label: "Link with QR Code",
      icon: <Qr />,
      content:  currentAccount?.id ? <TabContent currentAccount={currentAccount} onClose={closeFunc} /> : <></>  ,
    },
  ];

  return (
    <UserLayout>
      {/* <div> Wellcmoe</div> */}
      <div className="h-screen">
        <div className="w-full bg-white">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-[1.3rem] leading-7 font-bold text-black">
                Manage Accounts
              </h1>
              <p className="text-gray-600 leading-7 text-[0.9rem]">
                Link your Whatsapp accounts here
              </p>
            </div>
            <div>
              {/* <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">+ Add Account</button> */}
              <Button onClick={handleOpenModal} primary icon={<Plus />}>
                Add Account
              </Button>
            </div>
          </section>

          <section className="lg:flex lg:space-x-4 mt-8">
            <section className="px-4 py-8 lg:w-[50%] lg:flex justify-between bg-green-50 border border-green-50 rounded-lg">
              <div className="">
                <p className="font-semibold text-gray-900 leading-6">
                  Link your WhatsApp account
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Please update/verify your information before <br />{" "}
                  <strong>13th July 2023 </strong> to unlock level benefits
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Image
                  src="/whatsapp-img.png"
                  alt="WhatsApp Logo"
                  objectFit="contain"
                  width={100}
                  height={100}
                />
              </div>
            </section>
            <section className="px-4 py-4 mt-4 lg:mt-0 lg:w-[50%] border-2 border-[#F7F9F] rounded-lg">
              <div className="rounded-lg">
                <p className="text-[0.9] text-gray-500 font-bold">
                  Account Usage
                </p>
                <p className="text-[1rem] font-bold text-gray-900 mt-1">0/1</p>
              </div>
              <div className="mt-8">
                <Button primary>Upgrade</Button>
              </div>
            </section>
          </section>
          {loading ? (
                <div>Loading....</div> 
            ) : Array.isArray(accounts) && accounts.length > 0 ? (
                <Table
                    setIsOpen={openFuc}
                    isOpen={isOpen}
                    headers={headers}
                    data={accounts}
                    actions={actions}
                />
            ) : (
                <EmptyState />
            )}
          {/* {showTable ? (
            <div className="my-5">
              
              {getaccountdata  ? (
                <Table
                  setIsOpen={openFuc}
                  isOpen={isOpen}
                  headers={headers}
                  data={getaccountdata}
                  actions={actions}
                />
              ) : (
                <></>
              )}
            </div>
          ) : (
            //     <div className="my-40 flex flex-col items-center">
            //     <Image src="/book.png" alt="No accounts added" height={100} width={100} />
            //     <p className="text-gray-900 text-[1rem] leading-10">No accounts added</p>
            //     <p className="text-gray-600 text-sm">Click "add account" button to get started in linking your first whatsapp account</p>
            //   </div>
            <Default
              src="/book.png"
              alt="No accounts added"
              height={100}
              width={100}
              mainText="No accounts added"
              subText="Click 'add account' button to get started in linking your first WhatsApp account"
            />
          )} */}
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeFunc}>
        <Tabs tabs={tabs} />
      </Modal>
      <div>
        <Modal isOpen={open} onClose={handleCloseModal}>
          <div className="bg-white">
            <h2 className="text-2xl font-semibold mb-4">
              Add New WhatsApp Number
            </h2>
            <p className="text-gray-600 mb-6">Connect your WhatApp account </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  id="phoneNumber"
                  type="text"
                  placeholder="Placeholder"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  name="description"
                  id="description"
                  type="text"
                  placeholder="Placeholder"
                  value={user.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
                <p className="mt-2 text-sm text-gray-500">
                  What is this list for?
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Number
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </UserLayout>
  );
}
