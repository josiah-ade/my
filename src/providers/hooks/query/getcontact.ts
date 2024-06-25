import { IQueryArgs } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { IContactList } from "@/typings/interface/contacts";
import { getBroadcastContact } from "@/providers/services/contact";
import { IBroadcastContact } from "@/typings/interface/broadcasts";

export function useGetBroadcastContact(id: string) {
  const users: IQueryArgs<string, IBroadcastContact[]> = {
    key: ["broadcast_contact", { id }],
    callback: () => getBroadcastContact(id),
  };
  return useGetResourcesQuery(users);
}
