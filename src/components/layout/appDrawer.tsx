import { AutomationMenus } from "@/core/const/automation";
import { BroadcastMenus } from "@/core/const/broadcast";
import { UserMenus } from "@/core/const/menu.const";
import useActiveMenu from "@/providers/hooks/layout/activeMenu";
import { useActiveAutomation } from "@/providers/hooks/layout/activeautomation";
import useActiveBroadcast from "@/providers/hooks/layout/activebroadcast";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface Props {
  display: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export default function AppDrawer({ display, onToggle }: Props) {
  const currentMenuItem = useActiveMenu();
  const currentAutomationItem = useActiveAutomation();
  const currentBroadcastItem = useActiveBroadcast();

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
        {UserMenus.filter((item) => !item.disabled).map((item) => {
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
        <div className="py-2">
          <hr />
        </div>
        <div>
          <p className="text-gray-400 text-sm py-3  px-4">Broadcast</p>
          {BroadcastMenus.filter((item) => !item.disabled).map((item) => {
            const isActive =
              currentBroadcastItem && currentBroadcastItem.path != "" && item.path == currentBroadcastItem.path;
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
        <div className="py-2">
          <hr />
        </div>
        <div>
          <p className="text-gray-400 text-sm py-3  px-4">Automation</p>
          {AutomationMenus.filter((item) => !item.disabled).map((item) => {
            const isActive =
              currentAutomationItem && currentAutomationItem.path != "" && item.path == currentAutomationItem.path;
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
      </div>
      {display ? (
        <div onClick={onToggle} className="opacity-30 fixed inset-0 z-10 bg-black lg:hidden h-screen"></div>
      ) : null}
    </>
  );
}
