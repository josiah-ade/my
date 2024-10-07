import { AdminMenus } from "@/core/const/menu.const";
import useActiveMenu from "@/shared/hooks/layout/activeMenu";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppDrawer({ display, onToggle }: Props) {
  const currentMenuItem = useActiveMenu();

  return (
    <>
      <div
        className={`w-[18rem] py-3 fixed lg:flex z-20 lg:mt-[5rem] lg:z-auto  h-screen lg:h-[calc(100vh-5rem)] bg-gray-50 flex flex-col gap-1 overflow-y-auto
        ${display ? "flex" : "hidden"}
        ${display ? "top-0 " : ""} `}
      >
        <div className="flex mb-8 lg:hidden justify-between">
          <h2 className="text-2xl lg:text-2xl font-semibold p-5">{currentMenuItem?.title || "Dashboard"}</h2>
          <div className="flex justify-end cursor-pointer" onClick={onToggle}>
            <FaTimes />
          </div>
        </div>
        {AdminMenus.filter((item) => !item.disabled).map((item) => {
          const isActive = currentMenuItem && currentMenuItem.path != "" && item.path == currentMenuItem.path;
          return (
            <Link href={item.disabled ? "#" : item.path} key={item.path}>
              <div
                className={`flex py-3 w-auto rounded-md px-4 justify-start items-center gap-1 
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
