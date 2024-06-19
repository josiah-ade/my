import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { IAccountInfo, IAccount } from "@/typings/interface/account";
import { createAccount } from "@/providers/services/account";
import { BroadCastList, IBroadCastList } from "@/core/types/data.interface";
import { createBroadcast } from "@/providers/services/broadcast";

export function useCreateBroadCastList({ onSuccess, onError }: IMutationHook) {
  const createbroadcast: IMutationArgs<BroadCastList, IBroadCastList> = {
    key: ["broadcast"],
    callback: (data: BroadCastList) => createBroadcast(data),
    onSuccess: onSuccess,
    onError: onError,
  };
  return useCreateResources(createbroadcast);
}
