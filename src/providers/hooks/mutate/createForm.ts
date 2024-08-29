import { ICreateForm, IFormList, ISubmitForm } from "@/typings/interface/form";
import { IMutationArgs, IMutationHook } from "@/typings/query";
import { useCreateResources } from "../helper/mutation";
import { CreateSubmitForm, EditForm, createForm, deleteForm } from "@/providers/services/userForm";

export function useCreateForm({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ICreateForm, ICreateForm> = {
    key: ["form"],
    callback: (data: ICreateForm) => createForm(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useEditForm({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IFormList, IFormList> = {
    key: ["form"],
    callback: (data: IFormList) => EditForm(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteForm({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<string, IFormList> = {
    key: ["form"],
    callback: (id: string) => deleteForm(id),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useCreateSubmissionForm({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<ISubmitForm, ISubmitForm> = {
    key: ["form"],
    callback: (data: ISubmitForm) => CreateSubmitForm(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
