import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useAuthContext } from "@/providers/context/auth";
import { useRouter } from "next/router";
import { useState } from "react";

interface IDropdown {
  onClose: () => void;
  isOpen: boolean;
  onClick: (action: string) => void;
}

const Actions = [
  { title: "Profile", value: "profile" },
  { title: "Settings", value: "settings" },
  { title: "Logout", value: "logout" },
];

const DropdownMenu = (props: IDropdown) => {
  const { isOpen, onClose } = props;

  if (!isOpen) return null;
  return (
    <div className="absolute top-[5rem] right-0 bg-white shadow-md rounded-md px-4 py-5 w-[18rem] z-[1000]">
      <div className="flex flex-col gap-4">
        {Actions.map((action) => (
          <h3 className="cursor-pointer" onClick={() => props.onClick && props.onClick(action.value)}>
            {action.title}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
