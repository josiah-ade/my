import { ContactAccount } from "@/typings/interface/account";
import { IQueryArgs, IQueryOptions } from "../../../typings/query";

import { useGetResourcesQuery } from "../helper/query";
import { getGoogleContacts } from "@/providers/services/google";

export function useGetGoogleContacts(token: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<void, ContactAccount[]> = {
    key: ["googleContact", { token }],
    callback: () => getGoogleContacts(token),
  };
  return useGetResourcesQuery(users, options);
}
