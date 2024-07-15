import { Data } from "@/core/types/data.interface";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";

import { Bin, Userg, Pencil, Usercancel } from "@/core/const/icons/icons";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import { useEmptyBroadcastList } from "@/providers/hooks/mutate/broadcast";
import ConfirmationModal from "../account/deleteConfirmationModal";
import { IFormList } from "@/typings/interface/form";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
}

interface IDPRops extends Data {
  action: string;
}

const actions: IDPRops[] = [
  { text: "Copy Form Code (iFrame)", action: "import", icon: <Userg className="h-4 w-4" /> },
  { text: "Copy Raw HTML Code", action: "edit", icon: <Pencil className="h-4 w-4" /> },
  { text: "Archive Form", action: "empty", icon: <Usercancel className="h-4 w-4" /> },
  { text: "Delete", action: "delete", icon: <Bin className="h-4 w-4 text-red-600" /> },
];

export default function AccountTableActionComponent({ item, clickHandler }: TableHeaderActionProp<IFormList>) {
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
              {actions.map((action, actionIndex) => (
                <Menu.Item key={`broadcast_table_action_${action.action}`}>
                  {({ active }) => (
                    <div
                      className={`text-center text-sm flex items-center space-x-2 ${
                        active ? "bg-gray-100" : ""
                      } flex items-center px-4 py-2 text-sm text-gray-500} `}
                      onClick={() => clickHandler && clickHandler(action.action, item!)}
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
    </>
  );
}
