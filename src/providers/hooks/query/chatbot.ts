import { getChatBot, getChatBotDetail } from "@/providers/services/chatbot";
import { IChatBot } from "@/typings/interface/chatbot";
import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";

export function useGetChatBot(options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IChatBot[]> = {
    key: ["chatbot"],
    callback: () => getChatBot(),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetChatBotDetails(id: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IChatBot> = {
    key: ["chatbot", { id }],
    callback: () => getChatBotDetail(id),
  };
  return useGetResourcesQuery(users, options);
}

// export function useGetChatBotMessageHistory(id: string, options: IQueryOptions = {}) {
//   const queryArgs: IQueryArgs<void, IChatBotMessageHistory[]> = {
//     key: ["chatbotHistory", { id }],
//     callback: () => getChatBotMessageHistory(id),
//   };
//   return useGetResourcesQuery(queryArgs, options);
// }
