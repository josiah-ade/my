import { ChatBotType } from "@/core/enum/chatbot";
import { IAccount } from "./account";
import { IBroadcastLists } from "./broadcasts";
import { AutomationMatchType } from "@/core/enum/automation";

export interface ICreateChatBot {
  id?: string;
  accountId: string;
  broadcastId: string;
  type: ChatBotType;
  status?: string;
  messages: IChatBotMessage[];
  triggerWord?: string;
  matchPercentage?: number;
  matchType?: AutomationMatchType;
}

export interface IChatBotMessage {
  id?: string;
  text: string;
  minutesAfter?: number;
  files?: File[];
  sortOrder?: number;
}
export interface IChatBot extends Omit<ICreateChatBot, "accountId" | "broadcastId"> {
  account: IAccount;
  broadcast: IBroadcastLists;
}
export interface ChatbotMigrate {
  accountId: string;
  chatbotId?: string;
}
