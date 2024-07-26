import { AutomationMatchType, GroupAutomationType, OperationStatus } from "@/core/enum/automation";
import { ICreateGroupAutomation, ICreateGroupAutomationMessage } from "@/typings/interface/automation/group";

export const DefaultCreateGroupAutomationMessage: ICreateGroupAutomationMessage = {
  text: "",
  status: OperationStatus.ACTIVE,
};

export const DefaultCreateGroupAutomationData: ICreateGroupAutomation = {
  accountId: "",
  type: GroupAutomationType.WORD,
  status: OperationStatus.ACTIVE,
  messages: [{ ...DefaultCreateGroupAutomationMessage }],
  groups: [],
  triggerWord: "",
  matchPercentage: 0,
  matchType: AutomationMatchType.EXACT,
};
