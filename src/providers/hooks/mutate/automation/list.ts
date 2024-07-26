import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../../helper/mutation";
import { ICreateAutomationList, IListAutomation } from "@/typings/interface/automation";
import { createAutomationList, deleteAutomation, editAutomationId } from "@/providers/services/automation/list";

export function useCreateAutomationList({ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ICreateAutomationList, IListAutomation> = {
      key: ["listAutomation"],
      callback: (data) => createAutomationList(data),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutation);
  }
  
  export function useDeleteAutomation({ onSuccess, onError, options }: IMutationHook) {
    const mutationData: IMutationArgs<string, string> = {
      key: ["listAutomation"],
      callback: (id: string) => deleteAutomation(id),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutationData);
  }
  export function useEditAutomation(id:string,{ onSuccess, onError, options }: IMutationHook) {
    const mutation: IMutationArgs<ICreateAutomationList, ICreateAutomationList> = {
      key: ["listAutomation",'singleListAutomation'],
      callback: ( data:ICreateAutomationList) => editAutomationId(id,data),
      onSuccess: onSuccess,
      onError: onError,
      options,
    };
    return useCreateResources(mutation);
  }