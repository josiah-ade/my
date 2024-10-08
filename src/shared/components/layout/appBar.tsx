import logo from "@/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import DropdownMenu from "../common/dropdown";

import { FaRegUserCircle } from "react-icons/fa";
import { useAuthContext } from "@/shared/context/auth";

interface Props {
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppBar(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { auth } = useAuthContext();

  const handleDropdownAction = (action: string) => {
    if (action == "logout") {
      if (props.onLogout) props.onLogout();
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex w-full fixed bg-white justify-between  items-center lg:ml-[18rem] px-5 py-5 border-b z-[1] ">
        <div className="flex h-full items-center gap-3 ">
          <div className="py-2 lg:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <div className="hidden  md:flex lg:flex cursor-pointer gap-8 ">
            <Image src={logo} alt="Logo" height={200} width={100} />
            {/* <h2 className="text-xlg lg:text-2xl font-semibold"> {currentMenuItem?.title || "Dashboard"} </h2> */}
          </div>
        </div>
       
      </div>
    </>
  );
}
