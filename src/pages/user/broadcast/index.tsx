import React, { useState } from "react";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import { BroadCastList } from "@/core/types/data.interface";
import Table from "@/components/table";
import { Plus } from "@/core/const/icons/icons";
import Image from "next/image";
import AccountTableActionComponent from "@/components/broadcast/tableAction";
import Link from "next/link";
import { TableHeader } from "@/typings/interface/component/table";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import { CreateBroadcastModal } from "@/components/broadcast/addModal";
import { useRouter } from "next/router";

export default function User() {
  const { data: broadcastList } = useGetUserBroadcast();
  console.log(broadcastList, "raw");
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAction = (action: string, item: BroadCastList) => {
    if(action=="import"){
      router.push(`/user/broadcast/${item.id}/import`)
      return
    }
    window.alert("working");
  };

  const headers: TableHeader<BroadCastList>[] = [
    { field: "listName", title: "List Name", icon: "/chevron.jpg" },
    { field: "description", title: "Description", icon: "/chevron.jpg" },
    { field: "contacts", title: "Subscribers", icon: "/chevron.jpg" },
    {
      field: "view",
      title: "Actions",
      action: {
        component: (props) => (
          <Link href={`/user/broadcast/${props.item?.id ?? ""}`}>
            <Button primary {...props}>
              View List
            </Button>
          </Link>
        ),
      },
    },
    {
      field: "actions",
      title: "Actions",
      action: {
        component: AccountTableActionComponent,
        props: { clickHandler: handleAction },
      },
    },
  ];

  return (
    <UserLayout>
      <div className="bg-white">
        <div className="flex justify-between items-center mb-4">
          <section>
            <h2 className="text-xl font-semibold text-[1.3rem]">Broadcast Lists</h2>
            <p className="text[0.9rem]">View all your contacts here</p>
          </section>
          <section className="flex items-center space-x-2">
            <Button className="text-gray-600 px-4 py-2 border-2 border-gray-400 rounded-lg flex items-center">
              <img src="/goggle-icon.png" alt="Google" className="w-5 h-5 mr-2" />
              Connect Google Contacts
            </Button>
            <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg" icon={<Plus />} onClick={handleOpen}>
              Create List
            </Button>
          </section>
        </div>
        <section className="border border-gray-200">
          <div className="border-l-8 border-warning-500  rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full mr-4">
                <Image src="/warning.jpg" alt="waring" width={30} height={30} />
              </div>
              <div>
                <h3 className="font-medium">Broadcast List Usage (0/1)</h3>
                <p className="text-gray-500">
                  Your current plan limits you to 1 broadcast list, upgrade to create more lists
                </p>
              </div>
            </div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">Upgrade</button>
          </div>
        </section>
      </div>

      {broadcastList ? (
        <Table headers={headers} data={broadcastList} />
      ) : (
        <Default
          src="/list.png"
          alt="list"
          height={100}
          width={100}
          mainText="No List Created"
          subText="Click “create list” button to get started in creating your first broadcast list"
        />
      )}

      <CreateBroadcastModal isOpen={isOpen} onClose={handleClose} />
    </UserLayout>
  );
}
