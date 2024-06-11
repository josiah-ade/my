import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineDashboard } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";


export const BroadcastMenus: Menu[] = [
    {
        title: "Broadcast List",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/user/broadcast",
      },
    {
        title: "Broadcast Messages",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/user/broadcast",
      },
    {
        title: "Broadcast Reports",
        id: "3",
        icon: MdOutlineFormatAlignJustify,
        path: "/user/broadcast",
      },
];

export const UserBroadcastLookup = BroadcastMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
