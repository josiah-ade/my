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
import { useDeleteBroadcast, useEmptyBroadcastList } from "@/providers/hooks/mutate/broadcast";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import { UserRoutes } from "@/core/const/routes.const";
import { NotificationType } from "@/core/enum/notification";
import useNotificationStore from "@/providers/stores/notificationStore";
import { BroadcastTableAction } from "@/core/enum/broadcast";
import GoogleSignInButton from "@/components/contacts/googleSignInButton";
import { useLimitsStore } from "@/providers/stores/statisticsStore";
import DataUpgrade from "@/components/stateupgrade/upgrade";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => { } };

export default function BroadcastListPage() {
  const setNotification = useNotificationStore((state) => state.displayNotification);
  const [currentBroadcast, setCurrentBroadcast] = useState<IBroadcastLists>();
  const router = useRouter();
  const { data: broadcastList } = useGetUserBroadcast();
  const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false });
  const stats = useLimitsStore((state) => state.limit);
  const { mutate: deleteBroadcast } = useDeleteBroadcast({
    onSuccess: () => handleSuccess("Broadcast Deleted", "Your broadcast was successfully removed."),
    options: { errorConfig: { title: "Failed to Delete Broadcast, The broadcast could not be deleted. Please try again." } },
  });

  const actionLookup = {
    ["empty"]: (item: IBroadcastLists) => handleEmpty(item),
    [BroadcastTableAction.delete]: (item: IBroadcastLists) => handleDelete(item),
    ["edit"]: (item: IBroadcastLists) => handleOpenModal("edit"),
    ["import"]: (item: IBroadcastLists) => router.push(`${UserRoutes.BROADCAST}/${item.id}/import`),
  };

  const handleSuccess = (title: string, text: string) => {
    setNotification({
      type: NotificationType.success,
      content: { title, text },
    });
    handleCloseModal("confirmation");
  };
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
      () => {
        handleCloseModal("confirmation"), deleteBroadcast(item.id);
      }
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

  const handleAction = (action: string, item: IBroadcastLists) => {
    setCurrentBroadcast({ ...item });
    actionLookup[action as keyof typeof BroadcastTableAction](item);
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
          <Link href={`${UserRoutes.BROADCAST}/${props.item?.id ?? ""}`}>
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
            <GoogleSignInButton />
            <Button className="px-4 py-2 rounded-lg" primary icon={<Plus />} onClick={() => handleOpenModal("edit")}>
              Create List
            </Button>
          </section>
        </div>
        <DataUpgrade heading={`Broadcast List Usage (${stats?.total_broadcastLists ?? 0}/${stats?.broadcastLists ?? 0})`}
         description={`your current plan limits you to ${stats?.broadcastLists ?? 0} broadcast list, upgrade to create more lists`} />
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
