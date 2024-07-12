import { IQueryArgs, IQueryOptions } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getBroadcastContact } from "@/providers/services/contact";
import { IBroadcastContact } from "@/typings/interface/broadcasts";

export function useGetBroadcastContact(id: string, options?: IQueryOptions) {
  const users: IQueryArgs<string, IBroadcastContact[]> = {
    key: ["broadcastContact", { id }],
    callback: () => getBroadcastContact(id),
  };
  return useGetResourcesQuery(users, options);
}
