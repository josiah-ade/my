import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineDashboard } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { UserRoutes } from "./routes.const";

export const UserMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    icon: FaHashtag,
    path: `${UserRoutes.DASHBOARD}`,
  },
  {
    title: "Account",
    id: "2",
    icon: LuUsers2,
    path: `${UserRoutes.ACCOUNT}`,
  },
  {
    title: "Contacts",
    id: "3",
    icon: RiContactsLine,
    path: `${UserRoutes.CONTACTS}`,
  },
  {
    title: "Team",
    id: "2",
    icon: LuUsers2,
    path: `${UserRoutes.TEAMS}`,
    disabled: true,
  },
  {
    title: "Subscriptions",
    id: "2",
    icon: FaHashtag,
    disabled: true,
    path: `${UserRoutes.SUBSCRIPTION}`,
  },
  {
    title: "Forms",
    id: "6",
    icon: MdOutlineFormatAlignJustify,
    disabled: true,
    path: `${UserRoutes.FORM}`,
  },
  {
    title: "Chatbot",
    id: "7",
    icon: MdOutlineFormatAlignJustify,
    disabled: true,
    path: `${UserRoutes.CHAT_BOT}`,
  },
  {
    title: "Login",
    id: "8",
    icon: MdOutlineFormatAlignJustify,
    path: "/",
  },
];

export const UserMenuLookup = UserMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
