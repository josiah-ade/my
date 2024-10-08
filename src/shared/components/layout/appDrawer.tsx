import { AdminMenus } from "@/core/const/menu.const";
import useActiveMenu from "@/shared/hooks/layout/activeMenu";
import Link from "next/link";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import DropdownMenu from "../common/dropdown";
import { useAuthContext } from "@/shared/context/auth";
import { useState } from "react";
import Image from "next/image";
import profile from "../../../assets/profile.png"

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppDrawer(props:Props) {
  const { display, onToggle }=props
  const currentMenuItem = useActiveMenu();
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
      <div
        className={`w-[18rem] py-3 fixed lg:flex z-20 lg:z-auto border-x h-screen lg:h-[calc(100vh-5rem)] bg-gray-50 flex flex-col gap-1 overflow-y-auto
        ${display ? "flex" : "hidden"}
        ${display ? "top-0 " : ""} `}
      >
        <div className="flex mb-8 lg:hidden justify-between ">
          <h2 className="text-2xl lg:text-2xl font-semibold p-5">{currentMenuItem?.title || "Dashboard"}</h2>
          <div className="flex justify-end cursor-pointer" onClick={onToggle}>
            <FaTimes />
          </div>
        </div>
        <div className=" hidden md:flex items-center gap-2 cursor-pointer lg:mt-[1rem] px-4" >
          <Image src={profile} alt="profile" />
          <div className="flex flex-row gap-7">
          <div className="text-xs">
            <h4 className="font-bold">{auth?.fullname ?? "Alison Ayo"}</h4>
            <p>{auth?.email ?? "alison.0@gmail.com"}</p>
          </div>
          <div className="mt-3">
            <FaRegUserCircle onClick={toggleDropdown} />
          </div>
          </div>
          <div className="">
            {isOpen ? (
              <DropdownMenu isOpen={isOpen} onClick={handleDropdownAction} onClose={() => setIsOpen(false)} />
            ) : null}
          </div>
        </div>
        {AdminMenus.filter((item) => !item.disabled).map((item) => {
          const isActive = currentMenuItem && currentMenuItem.path != "" && item.path == currentMenuItem.path;
          return (
            <Link href={item.disabled ? "#" : item.path} key={item.path}>
              <div
                className={`flex lg:mt-[2rem] py-3 w-auto rounded-md px-4 justify-start items-center gap-1 
                  ${item.disabled ? "cursor-not-allowed" : "cursor-pointer"} 
                  ${isActive ? "bg-primary-50 text-gray-900 font-medium" : "text-gray-700 hover:bg-[#E7E9EF]"}`}
              >
                <span>
                  {item.icon ? <item.icon size={18} className={`${isActive ? " text-primary " : ""}`} /> : null}
                </span>
                <span className="pl-2">{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      {display ? (
        <div onClick={onToggle} className="opacity-30 fixed inset-0 z-10 bg-black lg:hidden h-screen"></div>
      ) : null}
    </>
  );
}
