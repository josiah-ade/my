import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { BroadCastList } from "@/core/types/data.interface";
import { createBroadcast } from "@/providers/services/broadcast";
import { IBroadcastList } from "@/typings/interface/broadcasts";

export function useCreateBroadCastList({ onSuccess, onError }: IMutationHook) {
  const mutation: IMutationArgs<BroadCastList, IBroadcastList> = {
    key: ["broadcast"],
    callback: (data: BroadCastList) => createBroadcast(data),
    onSuccess: onSuccess,
    onError: onError,
  };
  return useCreateResources(mutation);
}
