import { IContactList } from "@/typings/interface/contacts";
import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { ContactList,  } from "@/core/types/data.interface";
import { createContact } from "@/providers/services/contact";

export function useCreateContactList({ onSuccess, onError }: IMutationHook) {
  const createcontact: IMutationArgs<IContactList, ContactList> = {
    key: ["contac"],
    callback: (data: IContactList) => createContact(data),
    onSuccess: onSuccess,
    onError: onError,
  };
  return useCreateResources(createcontact);
}
