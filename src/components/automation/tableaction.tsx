import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IconType } from "react-icons";
import { TableHeaderActionProp } from "@/typings/interface/component/table";


interface IDPRops {
    action: string;
    icon:IconType;
 
  }
  
const automationLoop:IDPRops[]=[
    {
        icon:MdOutlineEdit,
        action: "edit",
},
    {
        icon:MdDelete,
        action: "delete",
},
//     {
//         icon:GrView,
//         action: "status",
// }
]

export default function AutomationTableActionComponent<T>({ item, clickHandler }: TableHeaderActionProp<T>) {
  return (
    <div className="flex flex-row gap-4">
      {automationLoop.map((action) => (
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
