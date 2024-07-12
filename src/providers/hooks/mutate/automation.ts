import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import { createAutomationList, deleteAutomation } from "@/providers/services/automation";
import { IAutomation, IAutomationContact, ICreateAutomationList } from "@/typings/interface/automation";

export function useCreateAutomationList({ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ICreateAutomationList, IAutomationContact> = {
      key: ["broadcast"],
      callback: (data) => createAutomationList(data),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutation);
  }
  
  export function useDeleteAutomation({ onSuccess, onError, options }: IMutationHook) {
    const mutationData: IMutationArgs<string, IAutomation> = {
      key: ["broadcast"],
      callback: (id: string) => deleteAutomation(id),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutationData);
  }