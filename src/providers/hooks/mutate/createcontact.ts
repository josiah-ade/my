import { CreateContactFromNewListDTO, IContactList } from "@/typings/interface/contacts";
import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { ContactList } from "@/core/types/data.interface";
import { createContact } from "@/providers/services/contact";
import { createBroadcast } from "@/providers/services/broadcast";

export function useCreateContactList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<IContactList, ContactList> = {
    key: ["broadcast"],
    callback: (data: IContactList) => createContact(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useCreateContactFromNewList({ onSuccess, onError, options }: IMutationHook) {
  const mutation: IMutationArgs<CreateContactFromNewListDTO, ContactList> = {
    key: ["broadcast"],
    callback: ({ contacts, broadcast }: CreateContactFromNewListDTO) =>
      createBroadcast(broadcast).then((resp) => createContact({ contacts, broadcastListId: resp.id })),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
