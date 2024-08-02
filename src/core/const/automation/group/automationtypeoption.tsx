import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { IGroupAutomation } from "@/typings/interface/automation/group";
import { getGroupAutomationTypeText } from "@/core/services/automation";

export default function GroupAutomationTypeDisplay(props: TableHeaderActionProp<IGroupAutomation>) {
  let displayText = props.item ? getGroupAutomationTypeText(props.item) : "";
  return <div>{displayText}</div>;
}
