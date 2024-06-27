import React, { useState } from "react";
import Button from "@/components/button/button";
import Default from "@/components/default/default";
import UserLayout from "@/layout/user";
import Table from "@/components/table";
import { Plus } from "@/core/const/icons/icons";
import Image from "next/image";
import AccountTableActionComponent from "@/components/broadcast/tableAction";
import Link from "next/link";
import { TableHeader } from "@/typings/interface/component/table";
import { useGetUserBroadcast } from "@/providers/hooks/query/getbroadcast";
import { CreateBroadcastModal } from "@/components/broadcast/addModal";
import { useRouter } from "next/router";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { useEmptyBroadcastList } from "@/providers/hooks/mutate/broadcast";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function User() {
  const [currentBroadcast, setCurrentBroadcast] = useState<IBroadcastLists>();
  const { data: broadcastList } = useGetUserBroadcast();

  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false });

  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };
  const handleCloseModal = (key: keyof ModalItems) => {
    currentBroadcast && setCurrentBroadcast(undefined);
    setModal((val) => ({ ...val, [key]: false }));
  };

  const { mutate: emptyList } = useEmptyBroadcastList({
    onSuccess: () => handleCloseModal("confirmation"),
    options: {
      errorConfig: { title: "Failed to delete contact" },
      successConfig: { title: "Contact Deleted", text: "The contact was successfully deleted." },
    },
  });

  const handleDelete = (item: IBroadcastLists) => {
    openConfirmationModal(
      "Delete Broadcast List",
      "Are you certain you want to delete the broadcast list? This will permanently erase all related contacts and information associated with this list",
      "Delete BroadcastList",
      // () => emptyList(item.id)
      () => handleCloseModal("confirmation")
    );
  };

  const handleEmpty = (item: IBroadcastLists) => {
    item.contacts > 0
      ? openConfirmationModal(
          "Empty Broadcast Contact List",
          "Are you certain you want to empty this broadcastList? This will permanently erase all related contacts associated with this list",
          "Empty List",
          () => emptyList(item.id)
        )
      : openConfirmationModal("Prompt", "Your list is already empty", "Close", () => handleCloseModal("confirmation"));
  };

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };

  const actionLookup = {
    ["empty"]: (item: IBroadcastLists) => handleEmpty(item),
    ["delete"]: (item: IBroadcastLists) => handleDelete(item),
    ["edit"]: (item: IBroadcastLists) => handleOpenModal("edit"),
  };

  const handleAction = (action: string, item: IBroadcastLists) => {
    setCurrentBroadcast({ ...item });
    actionLookup[action as keyof typeof actionLookup](item);
  };

  const headers: TableHeader<IBroadcastLists>[] = [
    { field: "listName", title: "List Name", icon: "/chevron.jpg" },
    { field: "description", title: "Description", icon: "/chevron.jpg" },
    { field: "contacts", title: "Subscribers", icon: "/chevron.jpg" },
    {
      field: "view",
      title: "Action",
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
      field: "action",
      title: "Actions",
      action: { component: AccountTableActionComponent, props: { clickHandler: handleAction } },
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
            <Button
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              icon={<Plus />}
              onClick={() => handleOpenModal("edit")}
            >
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

      <CreateBroadcastModal
        isOpen={modal.edit}
        onClose={() => handleCloseModal("edit")}
        broadcastDetail={currentBroadcast}
        key={currentBroadcast?.id}
      />
      <ConfirmationModal
        isOpen={modal.confirmation}
        onClose={() => handleCloseModal("confirmation")}
        {...confirmationProp}
      />
    </UserLayout>
  );
}
