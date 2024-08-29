import { Dispatch, SetStateAction } from "react";
import { IBroadcastLists } from "./broadcasts";
import { IAccountInfo } from "./account";

export interface IAutomationContact {
  accountId: string;
  id: string;
  broadCastListId: string;
  type: string;
  time: string;
  timeZone: string;
  status: string;
  tagCondition: string;
}

export interface IListAutomation {
  id: string;
  account: IAccountInfo;
  broadcast: IBroadcastLists;
  type: string;
  time: string;
  minutesAfter: number;
  sendDate: string;
  timeZone: string;
  status: string;
  tagCondition: string;
  text?: string;
}

export interface ICreateAutomationList {
  accountId: string;
  broadCastListId: string;
  type: string;
  text: string;
  typeValue: number;
  time: string;
  sendDate: string;
  minutesAfter: number;
  timeZone: string;
  status: string;
  tagCondition: string;
  tags: string[];
  files: Record<string, any>[];
}
export interface IDayOption {
  text: string;
  value: string;
  typeValue?: number;
}

export interface IChanges {
  formData: ICreateAutomationList;
  setFormData: Dispatch<SetStateAction<ICreateAutomationList>>;
  // errors:ICreateAutomationList | undefined
}

export interface PageProps {
  automationList?: IListAutomation;
  errorMessage?: string;
  isLoading?: boolean;
}

export interface FileType {
  [key: string]: string;
}

interface Account {
  id: string;
  connectedNumber: string;
  phoneNumber: string;
  isExpired: boolean;
}

interface Broadcast {
  id: string;
  description: string;
  listName: string;
}

export interface IGetAutomationSchedule {
  id: string;
  account: Account;
  broadcast: Broadcast;
  type: string;
  time: string;
  minutesAfter: number;
  sendDate: string;
  timeZone: string;
  status: string;
  tagCondition: string;
}

export interface IAutomation extends IGetAutomationSchedule {
  id: string;
}

export interface AutomatiomTemplate {
  templateName: string;
  automationType: string;
  groupInAutomation: string;
  timeDelivery: string;
  groupsAutomation: string;
}
