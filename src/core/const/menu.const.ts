import { BsHouseDash } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { MdOutlineSubscriptions } from "react-icons/md";
import { AdminRoutes } from "./routes.const";
import { LuUsers2 } from "react-icons/lu";
import { Menu } from "../types/interfaces/components/menu.interface";

export const AdminMenus: Menu[] = [
  {
    title: "Dashboard",
    id: "1",
    icon: BsHouseDash,
    path: `${AdminRoutes.DASHBOARD}`,
  },
  {
    title: "Users",
    id: "2",
    icon: MdOutlineAccountCircle,
    path: `${AdminRoutes.ACCOUNT}`,
  },
  {
    title: "Payment",
    id: "3",
    icon: GrContactInfo,
    path: `${AdminRoutes.PAYMENT}`,
  },
  {
    title: "Admin Team",
    id: "2",
    icon: LuUsers2,
    path: `${AdminRoutes.TEAMS}`,
    disabled: true,
  },
  {
    title: "Subscriptions",
    id: "2",
    icon: MdOutlineSubscriptions,
    // disabled: false,
    path: `${AdminRoutes.SUBSCRIPTION}`,
  },
];

export const AdminMenuLookup = AdminMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
