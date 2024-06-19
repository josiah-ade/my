import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { ICreateAccount, IAccount } from "@/typings/interface/account";
import { createAccount } from "@/providers/services/account";

export function useCreateAccount({ onSuccess, onError }: IMutationHook) {
  const createaccount: IMutationArgs<ICreateAccount, IAccount> = {
    key: ["account"],
    callback: (data: ICreateAccount) => createAccount(data),
    onSuccess: onSuccess,
    onError: onError,
  };
  return useCreateResources(createaccount);
}
