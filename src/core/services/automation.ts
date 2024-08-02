import { IGroupAutomation } from "@/typings/interface/automation/group";
import { GroupAutomationTypes } from "../const/automation/group/types.const";
import { IListAutomation } from "@/typings/interface/automation";
import { DayOptions } from "../const/automation/days.const";

export function getGroupAutomationTypeText(automation: IGroupAutomation) {
  const automationType = GroupAutomationTypes.find((item) => item.value == automation.type);
  return automationType?.subLabel ?? "";
}

export function getListAutomationTypeText(automation: IListAutomation) {
  const automationType = DayOptions.find((item) => item.value == automation.type);
  return automationType?.text ?? "";
}
