import { IAPIFilter, IPaginatedQueryArgs, IQueryArgs } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { BroadCastList } from "@/core/types/data.interface";
import { getBroadcast } from "@/providers/services/broadcast";
import { IBroadcastList } from "@/typings/interface/broadcasts";

export function useGetUserBroadcast() {
  const users: IQueryArgs<BroadCastList, IBroadcastList[]> = {
    key: ["broadcast"],
    callback: () => getBroadcast(),
  };
  return useGetResourcesQuery(users);
}
