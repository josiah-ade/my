import { ReactElement } from "react";
import { IconType } from "react-icons";

export interface Menu {
  title: string;
  id: string;
  icon?: IconType;
  path: string;
  disabled?: boolean;
}
export interface Limit {
  title: string;
  field: keyof  ILimitData;
  totalField: keyof  ILimitData;
}
export interface ILimitData {
  leads: number;
  total_leads: number;
  forms: number;
  total_forms: number;
  automations: number;
  total_automations: number;
  broadcastLists: number;
  total_broadcastLists: number;
  chatbots: number;
  total_chatbots: number;
  accounts: number;
  total_accounts: number;
  isPaid?:boolean,
  packageName?:string
}
