import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { UserRoutes } from "./routes.const";

export const BroadcastMenus: Menu[] = [
  {
    title: "Broadcast List",
    id: "1",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.BROADCAST}`,
  },
  {
    title: "Broadcast Messages",
    id: "2",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.BROADCAST_MESSAGE}`,
  },
  {
    title: "Broadcast Templates",
    id: "3",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.BROADCAST_TEMPLATE}`,
    disabled: true,
  },
];

export const UserBroadcastLookup = BroadcastMenus.reduce<{
  [key: string]: Menu;
}>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
