import { ICreateBroadcastList } from "./broadcasts";

export interface Contact {
  contactName: string;
  contactEmail: string;
  contactPhoneNumber: string;
}

export interface IContactList {
  contacts: Contact[];
  broadcastListId: string;
  automatedDay: number;
}

export interface CreateContactFromNewListDTO {
  contacts: Contact[];
  broadcast: ICreateBroadcastList;
  automatedDay: number;
}
