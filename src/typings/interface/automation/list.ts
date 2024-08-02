import { IContact } from "../account";
import { IBroadcastContact } from "../broadcasts";

export interface IListAutomationMessage {
  text: string;
  comment: string;
  receiverNumber: string;
  receiverName: string;
  contact: IBroadcastContact;
  sentTime?: string;
  status: string;
}
