import { MdDelete } from "react-icons/md";
import { IconType } from "react-icons";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IChatBot } from "@/typings/interface/chatbot";
import { TbRefresh } from "react-icons/tb";

interface IActionProps {
  action: string;
  icon: IconType;
}

const tableActions: IActionProps[] = [
  {
    icon: MdDelete,
    action: "delete",
  },
  {
    icon: TbRefresh,
    action: "migrate",
  },
];

export default function ChatBotTableActionComponent({ item, clickHandler }: TableHeaderActionProp<IChatBot>) {
  return (
    <div className="flex flex-row gap-3.5">
      {tableActions.map((action) => (
        <div key={action.action}>
          <span
            className="text-#D0D5DD cursor-pointer"
            onClick={() => clickHandler && clickHandler(action.action, item!)}
          >
            {action.icon && <action.icon size={20} className="text-gray-400" />}
          </span>
        </div>
      ))}
    </div>
  );
}
