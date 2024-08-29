import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineDashboard } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaHashtag } from "react-icons/fa";
import { UserRoutes } from "./routes.const";
import { BsHouseDash } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { TbMessageChatbot } from "react-icons/tb";
import { LiaHashtagSolid } from "react-icons/lia";



export const UserMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    icon: BsHouseDash,
    path: `${UserRoutes.DASHBOARD}`,
  },
  {
    title: "Account",
    id: "2",
    icon: MdOutlineAccountCircle,
    path: `${UserRoutes.ACCOUNT}`,
  },
  {
    title: "Contacts",
    id: "3",
    icon: GrContactInfo,
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
    icon: MdOutlineSubscriptions,
    // disabled: false,
    path: `${UserRoutes.SUBSCRIPTION}`,
  },
  {
    title: "Forms",
    id: "6",
    icon: FaWpforms,
    disabled: false,
    path: `${UserRoutes.FORM}`,
  },
  {
    title: "Chatbot",
    id: "7",
    icon: TbMessageChatbot,
    path: `${UserRoutes.CHAT_BOT}`,
  },
  {
    title: "Tags",
    id: "7",
    icon: LiaHashtagSolid,
    disabled: true,
    path: `${UserRoutes.CHAT_BOT}`,
  },
];

export const UserMenuLookup = UserMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
