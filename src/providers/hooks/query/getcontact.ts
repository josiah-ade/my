import { IAPIFilter, IPaginatedQueryArgs, IQueryArgs } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { ContactList } from "@/core/types/data.interface";
import { IContactList } from "@/typings/interface/contacts";
import { getContact } from "@/providers/services/contact";

export function useGetUserContact() {
  const users: IQueryArgs<IContactList, ContactList[]> = {
    key: ["contact"],
    callback: () => getContact(),
  };
  return useGetResourcesQuery(users);
}
