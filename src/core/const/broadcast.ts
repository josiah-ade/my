import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { UserRoutes } from "./routes.const";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiAnnouncement } from "react-icons/tfi";
import { SiReacthookform } from "react-icons/si";


export const BroadcastMenus: Menu[] = [
  {
    title: "Broadcast List",
    id: "1",
    icon: RxHamburgerMenu,
    path: `${UserRoutes.BROADCAST}`,
  },
  {
    title: "Broadcast Messages",
    id: "2",
    icon: TfiAnnouncement,
    path: `${UserRoutes.BROADCAST_MESSAGE}`,
  },
  {
    title: "Broadcast Templates",
    id: "3",
    icon: SiReacthookform,
    path: `${UserRoutes.BROADCAST_TEMPLATE}`,
  },
];

export const UserBroadcastLookup = BroadcastMenus.reduce<{
  [key: string]: Menu;
}>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
