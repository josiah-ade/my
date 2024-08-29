import { ICreateChatBot, IChatBotMessage } from "@/typings/interface/chatbot";
import { ChatBotType } from "../enum/chatbot";
import { AutomationMatchType } from "../enum/automation";
import { IGenericOption } from "@/typings/interface/input";

export const DefaultChatBotMessage: IChatBotMessage = {
  text: "",
  minutesAfter: 0,
  files: [],
};

export const DefaultChatBotData: ICreateChatBot = {
  accountId: "",
  broadcastId: "",
  type: ChatBotType.SINGLE,
  status: "active",
  messages: [{ ...DefaultChatBotMessage }],
  triggerWord: "",
  matchPercentage: 0,
  matchType: AutomationMatchType.EXACT,
};

export const ChatBotTypes: IGenericOption[] = [
  { label: "One Word, One Reply", value: ChatBotType.SINGLE },
  { label: "One Word, Multiple Replies", value: ChatBotType.MULTIPLE },
];

export const MatchOptions: IGenericOption[] = [
  { label: "Exact Match", value: AutomationMatchType.EXACT },
  { label: "Similarity Match", value: AutomationMatchType.SIMILAR },
];
