import React, { useState } from "react";
import Image from "next/image";
import Contact from "@/components/contacts/contacts";
import Modal from "@/components/modal/modal";
import UserLayout from "@/layout/user";
import Button from "@/components/button/button";
import { GoPlus } from "react-icons/go";

import Table from "@/components/table/table";
import Tabs from "@/components/tab/Tab";
import { Bin, Qr, Circle, Message, Hash, Repeat, Home, Link, Plus } from "@/core/const/icons/icons";
import { AccountData, Data, TableHeader } from "@/core/types/data.interface";
import Default from "@/components/default/default";

export default function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const openFuc = () => {
    setIsOpen(true);
  };

  const closeFunc = () => {
    setIsOpen(false);
  };

  const headers: TableHeader[] = [
    { field: "first", title: "WhatsApp Number" },
    { field: "second", title: "Purpose" },
    { field: "third", title: "Plan" },
    { field: "fourth", title: "Expiry" },
    { field: "fifth", title: "Service Status" },
  ];
  const data: AccountData[] = [
    {
      first: "+234 915 632 9332",
      second: "For RJStores",
      third: "Free Plan",
      fourth: "22 February 2024",
      fifth: "Disabled",
    },
    {
      first: "+234 915 632 9332",
      second: "For RJStores",
      third: "Free Plan",
      fourth: "22 February 2024",
      fifth: "Disabled",
    },
  ];
  const actions: Data[] = [
    { text: "Link with pairing code", icon: <Link className="h-4 w-4" /> },
    { text: "Link with QR code", icon: <Qr className="h-4 w-4" /> },
    { text: "Disconnect", icon: <Circle className="h-4 w-4" /> },
    { text: "Send test message", icon: <Message className="h-4 w-4" /> },
    { text: "Unsubscribe Keyword", icon: <Hash className="h-4 w-4" /> },
    { text: "Trigger Word To Move To Another List", icon: <Hash className="h-4 w-4" /> },
    { text: "Transfer License", icon: <Repeat className="h-4 w-4" /> },
    { text: "Delete", icon: <Bin className="h-4 w-4 text-red-600" /> },
  ];

  const tabs = [
    {
      label: "Link with Pairing Code",
      icon: <Home />,
      content: (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
          <h2 className="text-black text-[1.2rem] font-semibold mb-4">How to Link with pairing code</h2>
          <p className="mb-4 text-sm text-black leading-6">
            To link with a pairing code, open WhatsApp on the phone where 8038548936 is after you have requested, you
            will be prompted to input a pairing code, copy the code shown here and paste on your device. After few
            seconds, it'll show 'Connected' here, you can close this window after that.
          </p>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 flex flex-col items-center justify-center p-5 w-[100%] rounded-lg text-lg">
              <div className="flex gap-2.5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 20 21" fill="none">
                  <g clip-path="url(#clip0_53_3095)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.0859 3.40417C15.2061 1.53232 12.7059 0.50095 10.042 0.5C4.55283 0.5 0.08547 4.94221 0.08356 10.4025C0.082605 12.148 0.54147 13.8518 1.41288 15.3533L0 20.4854L5.27909 19.1083C6.7335 19.8976 8.37128 20.313 10.0377 20.3135H10.042C15.5302 20.3135 19.9981 15.8708 20 10.4106C20.0009 7.76426 18.9662 5.2765 17.0859 3.40465V3.40417ZM10.042 18.6411H10.0387C8.55367 18.6407 7.09689 18.2436 5.82583 17.4939L5.52357 17.3154L2.39078 18.1325L3.22686 15.0949L3.03013 14.7834C2.20169 13.4729 1.76383 11.9581 1.76479 10.403C1.7667 5.86484 5.47963 2.17241 10.0454 2.17241C12.2561 2.17336 14.3342 3.03047 15.8969 4.58655C17.4598 6.14216 18.3197 8.21061 18.3188 10.4096C18.3168 14.9482 14.6039 18.6407 10.042 18.6407V18.6411ZM14.5819 12.4766C14.3332 12.3527 13.1099 11.7544 12.8816 11.6718C12.6534 11.5891 12.4877 11.5478 12.322 11.7957C12.1563 12.0436 11.6793 12.6011 11.5342 12.7658C11.389 12.9311 11.2438 12.9515 10.9951 12.8275C10.7463 12.7036 9.94461 12.4424 8.99395 11.5996C8.25433 10.9433 7.75483 10.1333 7.60972 9.88536C7.46456 9.63752 7.59444 9.50359 7.71856 9.38061C7.83028 9.2695 7.96733 9.09144 8.09194 8.94707C8.21661 8.80271 8.25767 8.69923 8.34072 8.53442C8.42383 8.36917 8.38228 8.22486 8.32022 8.10088C8.25811 7.97696 7.76061 6.75895 7.55289 6.2637C7.35089 5.78127 7.14561 5.8468 6.99328 5.83872C6.84811 5.8316 6.68244 5.83018 6.51628 5.83018C6.35011 5.83018 6.08078 5.89191 5.85256 6.13978C5.62433 6.38763 4.98162 6.98641 4.98162 8.20392C4.98162 9.42144 5.87311 10.5986 5.99772 10.7639C6.12233 10.9291 7.75244 13.4282 10.2483 14.5004C10.8418 14.7554 11.3054 14.9078 11.6669 15.0218C12.2628 15.2103 12.8052 15.1838 13.234 15.1201C13.712 15.0489 14.7061 14.5213 14.9133 13.9434C15.1206 13.3655 15.1206 12.8698 15.0585 12.7667C14.9964 12.6637 14.8303 12.6015 14.5815 12.4776L14.5819 12.4766Z"
                      fill="#25D366"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_53_3095">
                      <rect width="20" height="20" fill="white" transform="translate(0 0.5)" />
                    </clipPath>
                  </defs>
                </svg>
                <p className="font-semibold ">Pairing Code</p>
              </div>
              <p className="text-gray-600  tracking-[0.4rem] MT-4 leading-8">2045692</p>
            </div>
          </div>

          <div>
            <Button onClick={closeFunc} primary className="w-full">
              Done
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "Link with QR Code",
      icon: <Qr />,
      content: (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg">
          <h2 className="text-black text-[1.2rem] font-semibold mb-4">How to Link with QR code</h2>
          <p className="mb-4 text-sm text-black leading-6">
            To link with a QR code, open WhatsApp on your phone, go to the settings, and tap on 'Link a Device'. Scan
            the QR code shown on this screen with your phone.
          </p>
          <div className="flex items-center justify-center mb-4">
            <div className=" px-4 py-2 rounded-md text-xl font-mono">
              <Image src="/qr.png" alt="qr" width={200} height={300} />
            </div>
          </div>

          <div>
            <Button onClick={closeFunc} primary className="w-full">
              Done
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <UserLayout>
      {/* <div> Wellcmoe</div> */}
      <div >
        <div className="w-full bg-white">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-[1.3rem] leading-7 font-bold text-black">Manage Accounts</h1>
              <p className="text-gray-600 leading-7 text-[0.9rem]">Link your Whatsapp accounts here</p>
            </div>
            <div>
              {/* <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">+ Add Account</button> */}
              <Button primary icon={<Plus />}>
                Add Account
              </Button>
            </div>
          </section>

          <section className="lg:flex lg:space-x-4 mt-8">
            <section className="px-4 py-8 lg:w-[50%] lg:flex justify-between bg-green-50 border border-green-50 rounded-lg">
              <div className="">
                <p className="font-semibold text-gray-900 leading-6">Link your WhatsApp account</p>
                <p className="text-sm text-gray-600 mt-1">
                  Please update/verify your information before <br /> <strong>13th July 2023 </strong> to unlock level
                  benefits
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Image src="/whatsapp-img.png" alt="WhatsApp Logo" objectFit="contain" width={100} height={100} />
              </div>
            </section>
            <section className="px-4 py-4 mt-4 lg:mt-0 lg:w-[50%] border-2 border-[#F7F9F] rounded-lg">
              <div className="rounded-lg">
                <p className="text-[0.9] text-gray-500 font-bold">Account Usage</p>
                <p className="text-[1rem] font-bold text-gray-900 mt-1">0/1</p>
              </div>
              <div className="mt-8">
                <Button primary>Upgrade</Button>
              </div>
            </section>
          </section>
          {showTable ? (
            <div className="my-5">
              <Table setIsOpen={setIsOpen} isOpen={isOpen} headers={headers} data={data} actions={actions} />
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
          )}
        </div>
        <div>
          {/* <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">+ Add Account</button> */}
          <Button primary icon={<GoPlus />}>
            Add Account
          </Button>
        </div>

        <section className="lg:flex lg:space-x-4 mt-8">
          <section className="px-4 gap-4 py-8 lg:w-[50%] lg:flex justify-between bg-green-50 border border-green-50 rounded-lg">
            <div className="">
              <p className="font-semibold text-gray-900 leading-6">Link your WhatsApp account</p>
              <p className="text-sm text-gray-600 mt-1">
                Please update/verify your information before <br /> <strong>13th July 2023 </strong> to unlock level
                benefits
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Image src="/whatsapp-img.png" alt="WhatsApp Logo" objectFit="contain" width={100} height={100} />
            </div>
          </section>
          <section className="px-4 py-4 mt-4 lg:mt-0 lg:w-[50%] border-2 border-[#F7F9F] rounded-lg">
            <div className="rounded-lg">
              <p className="text-[0.9] text-gray-500 font-bold">Account Usage</p>
              <p className="text-[1rem] font-bold text-gray-900 mt-1">0/1</p>
            </div>
            <div className="mt-8">
              <Button primary>Upgrade</Button>
            </div>
          </section>
        </section>
        {showTable ? (
          <div className="my-5">
            <Table setIsOpen={setIsOpen} isOpen={isOpen} headers={headers} data={data} actions={actions} />
          </div>
        ) : (
          <div className="my-40 flex flex-col items-center">
            <Image src="/book.png" alt="No accounts added" height={100} width={100} />
            <p className="text-gray-900 text-[1rem] leading-10">No accounts added</p>
            <p className="text-gray-600 text-sm">
              Click "add account" button to get started in linking your first whatsapp account
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeFunc}>
        <Tabs tabs={tabs} />
      </Modal>
    </UserLayout>
  );
}
