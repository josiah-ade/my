import React, { useState } from "react";
import Image from "next/image";
import UserLayout from "@/layout/user";
import Button from "@/components/button/button";
import Table from "../../components/table";
import { Plus } from "@/core/const/icons/icons";
import EmptyState from "@/components/common/empty/empty";
import { useGetUsersAcount } from "@/providers/hooks/query/getaccount";
import AddAccountModal from "@/components/account/addModal";
import { AccountTableHeaders } from "@/core/const/account/table";

export default function AccountPage() {
  const [modal, setModal] = useState(false);

  const { data: accounts } = useGetUsersAcount({ loadingConfig: { displayLoader: true } });

  return (
    <>
      <div>
        <div className="w-full bg-white">
          <section className="flex justify-between items-center">
            <div>
              <h1 className="text-[1.3rem] leading-7 font-bold text-black">Manage Accounts</h1>
              <p className="text-gray-600 leading-7 text-[0.9rem]">
                Link your Whatsapp accounts here
              </p>
            </div>
            <div>
              <Button onClick={() => setModal(true)} primary icon={<Plus />}>
                Add Account
              </Button>
            </div>
          </section>

          <section className="lg:flex  lg:gap-2 my-8">
            <section className="px-4 py-8  w-full lg:flex justify-between bg-green-50 border border-green-50 rounded-lg">
              <div className="">
                <p className="font-semibold text-gray-900 leading-6">Link your WhatsApp account</p>
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
            <section className="px-4 py-4 mt-4 lg:mt-0 w-full  border-2 border-[#F7F9F] rounded-lg">
              <div className="rounded-lg">
                <p className="text-[0.9] text-gray-500 font-bold">Account Usage</p>
                <p className="text-[1rem] font-bold text-gray-900 mt-1">0/1</p>
              </div>
              <div className="mt-8">
                <Button primary>Upgrade</Button>
              </div>
            </section>
          </section>
          {accounts && accounts.length > 0 ? (
            <Table pagination={{ pageSize: 5 }} headers={AccountTableHeaders} data={accounts} />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <AddAccountModal isOpen={modal} onClose={() => setModal(false)} />
    </>
  );
}

AccountPage.Layout = UserLayout;
