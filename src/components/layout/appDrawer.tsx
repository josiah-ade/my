import { UserMenus } from "@/core/const/menu.const";
import useActiveMenu from "@/providers/hooks/layout/activeMenu";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

interface Props {
  display: boolean;
  onToggle: () => void;
}

export default function AppDrawer(props: Props) {
  const currentMenuItem = useActiveMenu();

  return (
    <>
      <div
        className={`w-[19rem] px-3 pt-8 pb-3 h-full fixed lg:relative lg:flex z-20 lg:z-auto overflow-auto border-r border-primary bg-white flex flex-col gap-4 
        ${props.display ? "flex" : "hidden"}
        ${props.display ? "top-0" : ""} `}
      >
        <div className="flex mb-8 lg:hidden justify-between">
          <h2 className="text-2xl lg:text-2xl font-semibold"> {currentMenuItem?.title || "Dashboard"} </h2>
          <div className="flex justify-end cursor-pointer" onClick={props.onToggle}>
            <FaTimes />
          </div>
        </div>
        {UserMenus.map((item) => {
          const isActive = currentMenuItem && currentMenuItem.path != "" && item.path == currentMenuItem.path;
          return (
            <Link href={item.path} key={item.path}>
              <div
                className={`flex h-[48px] w-auto rounded-md px-4 justify-start items-center gap-3 hover:bg-[#E7E9EF] cursor-pointer ${
                  isActive ? "bg-primary text-white " : "text-primary"
                }`}
              >
                {/* <img src="item.img" alt="" className="h-[24px] w-[24px]" /> */}
                <span>{item.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
      {props.display ? (
        <div onClick={props.onToggle} className="opacity-30 fixed inset-0 z-10 bg-black lg:hidden"></div>
      ) : (
        <> </>
      )}
    </>
  );
}
