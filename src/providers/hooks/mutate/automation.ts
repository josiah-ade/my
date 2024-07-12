import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import { createAutomationList } from "@/providers/services/automation";
import { IAutomationContact, ICreateAutomationList } from "@/typings/interface/automation";

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
  