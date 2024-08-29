import { IMutationHook, IMutationArgs } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import {
  createTemplateList,
  deleteTemplate as deleteBroadCastTemplate,
  editTemplate,
} from "@/providers/services/templates";
import { ICreateTemplate } from "@/typings/interface/templates";

export function useCreateBroadCastTemplateList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateTemplate, ICreateTemplate> = {
    key: ["broadcastTemplate"],
    callback: (data) => createTemplateList(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
export function useDeleteBroadcastTemplateList({ onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<string, string> = {
    key: ["broadcastTemplate"],
    callback: (id: string) => deleteBroadCastTemplate(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}
export function useEditBroadcastTemplateList(id: string, { onSuccess, onError, options }: IMutationHook) {
  const mutationData: IMutationArgs<ICreateTemplate, ICreateTemplate> = {
    key: ["broadcastTemplate"],
    callback: (data: ICreateTemplate) => editTemplate(id, data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutationData);
}
