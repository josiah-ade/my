import { IChatBot } from "@/typings/interface/chatbot";
import { ChatBotTypes } from "../const/chat.const";

export function getChatBotTypeText(chatbot: IChatBot) {
  const chatbotType = ChatBotTypes.find((item) => item.value == chatbot.type);
  return chatbotType?.label ?? "";
}
