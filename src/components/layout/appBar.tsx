import useActiveMenu from "@/providers/hooks/layout/activeMenu";
import Link from "next/link";
import logo from "../../assets/logo.png";
import profile from "../../assets/profile.png";
import Image from "next/image";
import { useState } from "react";
import DropdownMenu from "../common/dropdown/dropdown";
import { useAuthContext } from "@/providers/context/auth";
import { FaRegUserCircle } from "react-icons/fa";
import PlanOption from "./appcomponent/paidoption";

interface Props {
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppBar(props: Props) {

  const currentMenuItem = useActiveMenu();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const { auth } = useAuthContext();

  const handleDropdownAction = (action: string) => {
    if (action == "logout") {
      props.onLogout && props.onLogout();
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex w-full fixed bg-white justify-between  items-center px-5 py-5 border-b z-[1] ">
        <div className="flex h-full items-center gap-3 ">
          <div className="py-2 lg:hidden" onClick={props.onToggle}>
            <svg className="h-6 w-6 text-blue-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <div className="hidden  md:flex lg:flex cursor-pointer gap-8 ">
            <Image src={logo} alt="Logo" height={200} width={100} />
            <PlanOption />
            {/* <h2 className="text-xlg lg:text-2xl font-semibold"> {currentMenuItem?.title || "Dashboard"} </h2> */}
          </div>
        </div>
        <div className=" hidden md:flex items-center gap-2 cursor-pointer" onClick={toggleDropdown}>
          {/* <Image src={profile} alt="profile" /> */}
          <FaRegUserCircle size={24} />
          <div className="text-xs">
            <h4 className="font-bold">{auth?.fullname}</h4>
            <p>{auth?.email}</p>
          </div>
          <div className="">
            {isOpen ? (
              <DropdownMenu isOpen={isOpen} onClick={handleDropdownAction} onClose={() => setIsOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
