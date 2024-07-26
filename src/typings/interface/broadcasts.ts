import { IAPIFilter } from "../query";

export interface ICreateBroadcastList {
  listName: string;
  description: string;
  automationDay?: number;
}

export interface IBroadcastLists extends ICreateBroadcastList {
  id: string;
  contacts: number;
}

export interface IBroadcastContact {
  name: string;
  phoneNumber: string;
  email: string;
  automationDay: number;
  dateJoined: string;
  id: string;
  broadcastListId: string;
}

export interface IEditBroadcastContact {
  contactName: string;
  contactEmail: string;
  automationDay: number;
}
export interface IMessageFilter extends IAPIFilter {
  // type: string| 'list' | 'group' | 'automation' | 'BOT' | "" ;
  type: string ;
}

