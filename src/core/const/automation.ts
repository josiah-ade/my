import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineDashboard } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";


export const AutomationMenus: Menu[] = [
    {
        title: "Lists Automations",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/user/broadcast",
      },
    {
        title: "Group Automations",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/users",
      },
    {
        title: "Group Templates",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/grop/",
      },
];

export const UserAutomationLookup = AutomationMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
