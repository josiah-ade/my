import { CreateContactFromNewListDTO, IContactList } from "@/typings/interface/contacts";
import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { ContactList } from "@/core/types/data.interface";
import { createContact, deleteContact, editContact } from "@/providers/services/contact";
import { createBroadcast } from "@/providers/services/broadcast";
import { IBroadcastContact } from "@/typings/interface/broadcasts";
import { IGenericStatusResponse } from "@/typings/interface/api";

export function useCreateContactList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IContactList, ContactList> = {
    key: [ "broadcastContact"],
    callback: (data: IContactList) => createContact(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useCreateContactFromNewList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<CreateContactFromNewListDTO, ContactList> = {
    key: ["broadcastContact"],
    callback: ({ contacts, broadcast, automatedDay }: CreateContactFromNewListDTO) =>
      createBroadcast(broadcast).then((resp) => createContact({ contacts, broadcastListId: resp.id, automatedDay })),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useEditBroadcastContact({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IBroadcastContact, IBroadcastContact> = {
    key: ["broadcastContact"],
    callback: (data) => editContact(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useDeleteBroadcastContact({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IBroadcastContact, IGenericStatusResponse> = {
    key: ["broadcastContact", "broadcast"],
    callback: (data) => deleteContact(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
