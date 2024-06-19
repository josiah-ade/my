import { getSingleAccount } from "@/providers/services/account";
import { IAccount } from "@/typings/interface/account";
import { IAPIFilter, IPaginatedQueryArgs, IQueryArgs } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { BroadCastList, IBroadCastList } from "@/core/types/data.interface";
import { getBroadcast } from "@/providers/services/broadcast";

export function useGetUserBroadcast() {
  const users: IQueryArgs<BroadCastList, IBroadCastList[]> = {
    key: ["broadcast"],
    callback: () => getBroadcast(),
  };
  return useGetResourcesQuery(users);
}
