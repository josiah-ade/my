import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { UserRoutes } from "./routes.const";
import { FaHashtag } from "react-icons/fa";

export const AutomationMenus: Menu[] = [
  {
    title: "Lists Automations",
    id: "1",
    icon:FaHashtag,
    path: `${UserRoutes.LIST_AUTOMATION}`,
    disabled: false,
  },
  {
    title: "Group Automations",
    id: "2",
    icon: FaHashtag,
    path: `${UserRoutes.GROUP_AUTOMATION}`,
    disabled: false,
  },
  {
    title: "Group Templates",
    id: "3",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.GROUP_TEMPLATE}`,
    disabled: true,
  },
];

export const UserAutomationLookup = AutomationMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
