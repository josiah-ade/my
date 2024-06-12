import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineDashboard } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";


export const UserMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    icon: FaHashtag ,
    path: "/",
  },
  {
    title: "Account",
    id: "3",
    icon: LuUsers2   ,
    path: "/user/account",
  },
  {
    title: "Contacts",
    id: "3",
    icon: RiContactsLine ,
    path: "/user/contact",
  },
  {
    title: "Team",
    id: "2",
    icon: LuUsers2 ,
    path: "/user/",
  },
  {
    title: "Subscriptions",
    id: "2",
    icon: FaHashtag ,
    path: "/user",
  },
  {
    title: "Forms",
    id: "3",
    icon: MdOutlineFormatAlignJustify,
    path: "/user/form",
  },
  {
    title: "Chatbot",
    id: "3",
    icon: MdOutlineFormatAlignJustify,
    path: "/user/form",
  },
  {
    title: "Login",
    id: "7",
    icon: MdOutlineFormatAlignJustify,
    path: "/login",
  },
];

export const UserMenuLookup = UserMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
