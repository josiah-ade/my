import { createBroadcastMessage } from "@/providers/services/message";
import { ICreateBroadcastMessage } from "@/typings/interface/message";
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
