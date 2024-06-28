import { IAccount } from "@/typings/interface/account";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import PairQrcode from "@/components/tab/tabpairingcode";
import { Qr, Home } from "@/core/const/icons/icons";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { AccountTableAction } from "@/core/enum/account";
import Modal from "@/components/modal/modal";
import TabContent from "../tab/tabcontent";
import useNotificationStore from "@/providers/stores/notificationStore";
import { accountTableMenus } from "@/core/const/account/table";
import Tabs from "../tab/Tab";
import ConfirmationModal from "./deleteConfirmationModal";
import { useDeleteAccount, useDisconnectAccount } from "@/providers/hooks/mutate/account";
import { NotificationType } from "@/core/enum/notification";
import { useRouter } from "next/router";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import { UserRoutes } from "@/core/const/routes.const";

interface ModalItems {
  link: boolean;
  add: boolean;
  confirmation: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function AccountTableActionComponent({ item }: TableHeaderActionProp<IAccount>) {
  const [currentAccount, setCurrentAccount] = useState<IAccount>();
  const setNotification = useNotificationStore((state) => state.displayNotification);
  const router = useRouter();

  const [modal, setModal] = useState<ModalItems>({
    link: false,
    add: false,
    confirmation: false,
  });

  const actionLookup = {
    [AccountTableAction.link]: () => handleOpenModal("link"),
    [AccountTableAction.delete]: (item: IAccount) => handleDelete(item),
    [AccountTableAction.unsubscribeKeyword]: () => {},
    [AccountTableAction.disconnect]: (item: IAccount) => handleDisconnect(item),
    [AccountTableAction.transferLicense]: (item: IAccount) => {},
    [AccountTableAction.sendMessage]: (item: IAccount) => router.push(UserRoutes.BROADCAST_MESSAGE_SEND), // TODO: pass account id to route
    [AccountTableAction.triggerListMove]: (item: IAccount) => {},
  };

  const { mutate: deleteAccount } = useDeleteAccount({
    onSuccess: () => handleSuccess("Account deleted successfully", "Your account was deleted successfully"),
    options: { errorConfig: { title: "Failed to delete account" } },
  });

  const { mutate: disconnectAccount } = useDisconnectAccount({
    onSuccess: () => handleSuccess("Account disconnected successfully", "Your account was disconnected successfully"),
    options: { errorConfig: { title: "Failed to disconnect account" } },
  });

  const handleDelete = (item: IAccount) => {
    openConfirmationModal(
      "Delete Account",
      "Are you certain you want to delete this account? This will permanently erase all related information.",
      "Delete Account",
      () => deleteAccount(item.id)
    );
  };

  const handleDisconnect = (item: IAccount) => {
    openConfirmationModal(
      "Disconnect Account",
      "Are you certain you want to disconnect this account? Any linked services will also be disconnected",
      "Disconnect Account",
      () => disconnectAccount(item.id)
    );
  };

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
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
    setModal((val) => ({ ...val, [key]: false }));
  };

  const handleAction = (action: string, item: IAccount) => {
    setCurrentAccount(item);
    actionLookup[action as keyof typeof AccountTableAction](item);
  };
  const tabs = [
    {
      label: "Link with Pairing Code",
      icon: <Home />,
      content: <PairQrcode />,
    },
    {
      label: "Link with QR Code",
      icon: <Qr />,
      content: currentAccount?.id ? (
        <TabContent currentAccount={currentAccount} onClose={() => handleCloseModal("link")} />
      ) : (
        <></>
      ),
    },
  ];
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
          <Image src="/dots.png" alt="dots" width={10} height={10} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {accountTableMenus
                ?.filter((value) => (value.status ? value.status == item!.status : true))
                .map((action, actionIndex) => (
                  <Menu.Item key={actionIndex}>
                    {({ active }) => (
                      <div
                        className={`text-center text-sm flex items-center space-x-2 ${
                          active ? "bg-gray-100" : ""
                        } flex items-center px-4 py-2 text-sm text-gray-500 ${action.className ?? ""} `}
                        onClick={() => handleAction(action.action, item!)}
                      >
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        <span>{action.text}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {currentAccount?.id ? (
        <ConfirmationModal
          isOpen={modal.confirmation}
          onClose={() => handleCloseModal("confirmation")}
          {...confirmationProp}
        />
      ) : null}

      <Modal isOpen={modal.link} onClose={() => handleCloseModal("link")}>
        <Tabs tabs={tabs} />
      </Modal>
    </>
  );
}
