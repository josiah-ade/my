import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { UserRoutes } from "./routes.const";

export const AutomationMenus: Menu[] = [
  {
    title: "Lists Automations",
    id: "1",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.LIST_AUTOMATION}`,
    disabled: true,
  },
  {
    title: "Group Automations",
    id: "2",
    icon: MdOutlineFormatAlignJustify,
    path: `${UserRoutes.GROUP_AUTOMATION}`,
    disabled: true,
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
