import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../../helper/mutation";
import { ICreateGroupAutomation, IGroupAutomation } from "@/typings/interface/automation/group";
import {
  createGroupAutomation,
  deleteGroupAutomation,
  editGroupAutomation,
} from "@/providers/services/automation/group";
import { IGenericStatusResponse } from "@/typings/interface/api";

export function useCreateGroupAutomation({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateGroupAutomation, IGroupAutomation> = {
    key: ["groupAutomation"],
    callback: (data) => createGroupAutomation(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useEditGroupAutomation({ onSuccess, onError, options }: IMutationHook) {
  // const mutation: IMutationArgs<ICreateGroupAutomation, IGroupAutomation> = {
  const mutation: IMutationArgs<ICreateGroupAutomation, boolean> = {
    key: ["groupAutomation", "groupAutomationDetail"],
    callback: (data) => editGroupAutomation(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteGroupAutomation({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, IGenericStatusResponse> = {
    key: ["groupAutomation"],
    callback: (id: string) => deleteGroupAutomation(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}
