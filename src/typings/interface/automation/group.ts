import { AutomationMatchType, GroupAutomationType, OperationStatus } from "@/core/enum/automation";
import { IAccount, IGroupAccount } from "../account";

export interface ICreateGroupAutomationMessage {
  type?: GroupAutomationType;
  id?: string;
  text: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  timeZone?: string;
  minutesAfter?: number;
  status?: OperationStatus;
  files?: File[];
  sortOrder?: number;
}

export interface ICreateGroupAutomation {
  id?: string;
  accountId: string;
  type: GroupAutomationType;
  status?: OperationStatus;
  messages: ICreateGroupAutomationMessage[];
  groups: string[];
  triggerWord?: string;
  matchPercentage?: number;
  matchType?: AutomationMatchType;
}

export interface IGroupAutomationMessage extends ICreateGroupAutomationMessage {
  sentCount: number;
}

export interface IGroupAutomation {
  id: string;
  account: IAccount;
  groups: IGroupAccount[];
  messages: IGroupAutomationMessage[];
  type: GroupAutomationType;
  triggerWord?: string;
  matchPercentage?: number;
  matchType?: AutomationMatchType;
  status: OperationStatus;
}
