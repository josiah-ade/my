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
        className={`w-[18rem] pt-3 fixed lg:flex z-20 lg:mt-[5.3rem] lg:z-auto overflow-auto h-screen bg-gray-50 flex flex-col gap-1 
        ${display ? "flex h-screen" : "hidden"}
        ${display ? "top-0 h-screen" : ""} `}
      >
        <div className="flex mb-8 lg:hidden justify-between">
          <h2 className="text-2xl lg:text-2xl font-semibold">{currentMenuItem?.title || "Dashboard"}</h2>
          <div className="flex justify-end cursor-pointer" onClick={onToggle}>
            <FaTimes />
          </div>
        </div>
        {UserMenus.map((item) => {
          const isActive = currentMenuItem && currentMenuItem.path != "" && item.path == currentMenuItem.path;
          return (
            <Link href={item.disabled ? "#" : item.path} key={item.path}>
              <div
                className={`flex h-[40px] w-auto rounded-md px-4 justify-start items-center gap-1 hover:bg-[#E7E9EF] 
                  ${item.disabled ? "cursor-not-allowed" : "cursor-pointer"}
                  ${isActive ? "bg-primary-3 text-primary-4 font-bold" : "text-primary-4"} 
                  ${isActive ? " hover:bg-primary-3 text-primary-4 font-bold" : ""}`}
              >
                <span className={`${isActive ? " text-primary " : "text-primary-4"} `}>
                  {item.icon ? (
                    <item.icon size={18} className={`${isActive ? " text-primary " : "text-primary-4"}`} />
                  ) : null}
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
          <p className="text-primary-7 px-4">Broadcast</p>
          {BroadcastMenus.map((item) => {
            const isActive =
              currentBroadcastItem && currentBroadcastItem.path != "" && item.path == currentBroadcastItem.path;
            return (
              <Link href={item.disabled ? "#" : item.path} key={item.path}>
                <div
                  className={`flex h-[40px] w-auto rounded-md px-4 justify-start items-center gap-1 hover:bg-[#E7E9EF]
                    ${item.disabled ? "cursor-not-allowed" : "cursor-pointer"}
                    ${isActive ? "bg-primary-3 text-primary-4 font-bold" : "text-primary-4"}  
                    ${isActive ? " hover:bg-primary-3 text-primary-4 font-bold" : ""}`}
                >
                  <span className={`${isActive ? " text-primary " : "text-primary-4"} `}>
                    {item.icon ? (
                      <item.icon size={18} className={`${isActive ? " text-primary " : "text-primary-4"}`} />
                    ) : null}
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
          <p className="text-primary-7 px-4">Automation</p>
          {AutomationMenus.map((item) => {
            const isActive =
              currentAutomationItem && currentAutomationItem.path != "" && item.path == currentAutomationItem.path;
            return (
              <Link href={item.disabled ? "#" : item.path} key={item.path}>
                <div
                  className={`flex h-[40px] w-auto rounded-md px-4 justify-start items-center gap-1 hover:bg-[#E7E9EF]
                  ${item.disabled ? "cursor-not-allowed" : "cursor-pointer"}
                  ${isActive ? "bg-primary-3 text-primary-4 font-bold" : "text-primary-4"}
                  ${isActive ? " hover:bg-primary-3 text-primary-4 font-bold" : ""}`}
                >
                  <span className={`${isActive ? " text-primary " : "text-primary-4"} `}>
                    {item.icon ? (
                      <item.icon size={18} className={`${isActive ? " text-primary " : "text-primary-4"}`} />
                    ) : null}
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
