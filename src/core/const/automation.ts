import { Menu } from "@/typings/interface/component/layout/menu";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { UserRoutes } from "./routes.const";
import { FaHashtag } from "react-icons/fa";
import { BsDiagram3 } from "react-icons/bs";
import { CiStickyNote } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";


export const AutomationMenus: Menu[] = [
  {
    title: "Lists Automations",
    id: "1",
    icon:TiFlowChildren,
    path: `${UserRoutes.LIST_AUTOMATION}`,
    disabled: false,
  },
  {
    title: "Group Automations",
    id: "2",
    icon: BsDiagram3,
    path: `${UserRoutes.GROUP_AUTOMATION}`,
    disabled: false,
  },
  {
    title: "Group Templates",
    id: "3",
    icon: CiStickyNote,
    path: `${UserRoutes.GROUP_TEMPLATE}`,
    disabled: true,
  },
];

export const UserAutomationLookup = AutomationMenus.reduce<{ [key: string]: Menu }>((val, item) => {
  val = { ...val, [item.path]: item };
  return val;
}, {});
