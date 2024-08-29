import { IMutationArgs, IMutationHook } from "@/typings/query";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { ChatbotMigrate, IChatBot, ICreateChatBot } from "@/typings/interface/chatbot";
import { createChatBot, deleteChatBot, editChatBot, migrateChatBot } from "@/providers/services/chatbot";
import { useCreateResources } from "../helper/mutation";

export function useCreateChatBot({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateChatBot, IChatBot> = {
    key: ["chatbot"],
    callback: (data) => createChatBot(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useEditChatBot(id: string, { onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateChatBot, IChatBot> = {
    key: ["chatbot"],
    callback: (data) => editChatBot(id, data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteChatBot({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, IGenericStatusResponse> = {
    key: ["chatbot"],
    callback: (id: string) => deleteChatBot(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}
export function useMigrateChatBot( { onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ChatbotMigrate, IChatBot> = {
    key: ["chatbot"],
    callback: (data) => migrateChatBot( data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
