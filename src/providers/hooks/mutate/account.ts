import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { ICreateAccount, IAccount } from "@/typings/interface/account";
import { createAccount, deleteAccount, disconnectAccount } from "@/providers/services/account";
import { IGenericStatusResponse } from "@/typings/interface/api";

export function useCreateAccount({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<ICreateAccount, IAccount> = {
    key: ["account"],
    callback: (data: ICreateAccount) => createAccount(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}

export function useDeleteAccount({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, IAccount> = {
    key: ["account"],
    callback: (id: string) => deleteAccount(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}

export function useDisconnectAccount({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, IGenericStatusResponse> = {
    key: ["account"],
    callback: (id: string) => disconnectAccount(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}
