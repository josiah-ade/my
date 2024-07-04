// import { BroadCastList } from "@/core/types/data.interface";
import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { createBroadcast, emptyBroadcastListContacts, editBroadcastId, deleteBroadcast } from "@/providers/services/broadcast";
import { IBroadcastLists, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { IAccount } from "@/typings/interface/account";

export function useCreateBroadCastList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateBroadcastList, IBroadcastLists> = {
    key: ["broadcast"],
    callback: (data) => createBroadcast(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useEmptyBroadcastList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<string, IGenericStatusResponse> = {
    key: ["broadcast"],
    callback: (id) => emptyBroadcastListContacts(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteBroadcast({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, IBroadcastLists> = {
    key: ["deletebroacast"],
    callback: (id: string) => deleteBroadcast(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}

export function useEditBroadCastId({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IBroadcastLists, IBroadcastLists> = {
    key: ["editbroadcast"],
    callback: ( data:IBroadcastLists) => editBroadcastId(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}


