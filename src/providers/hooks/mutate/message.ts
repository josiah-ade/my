import { createBroadcastMessage, sendTestBroadcastMessage } from "@/providers/services/message";
import { ICreateBroadcastMessage, ISendTestBroadcastMessage } from "@/typings/interface/message";
import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import { IGenericStatusResponse } from "@/typings/interface/api";

export function useCreateBroadcastMessage({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateBroadcastMessage, IGenericStatusResponse> = {
    key: ["broadcastMessage"],
    callback: (data) => createBroadcastMessage(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useSendTestBroadcastMessage({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ISendTestBroadcastMessage, IGenericStatusResponse> = {
    key: [],
    callback: (data) => sendTestBroadcastMessage(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
