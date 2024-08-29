import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import { createAutomationList, deleteAutomation, editAutomationId } from "@/providers/services/automation";
import { IAutomation, IAutomationContact, ICreateAutomationList, IGetAutomationSchedule } from "@/typings/interface/automation";

export function useCreateAutomationList({ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ICreateAutomationList, IGetAutomationSchedule> = {
      key: ["createAutomation"],
      callback: (data) => createAutomationList(data),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutation);
  }
  
  export function useDeleteAutomation({ onSuccess, onError, options }: IMutationHook) {
    const mutationData: IMutationArgs<string, IAutomation> = {
      key: ["deleteAutomation"],
      callback: (id: string) => deleteAutomation(id),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutationData);
  }
  export function useEditAutomation(id:string,{ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ICreateAutomationList, ICreateAutomationList> = {
      key: ["edit"],
      callback: ( data:ICreateAutomationList) => editAutomationId(id,data),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutation);
  }