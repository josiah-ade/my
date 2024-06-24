import { IAPIFilter, IPaginatedQueryArgs, IQueryArgs, IQueryOptions } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { BroadCastList } from "@/core/types/data.interface";
import { getBroadcast } from "@/providers/services/broadcast";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { IBroadcastList } from "@/typings/interface/broadcasts";

export function useGetUserBroadcast(options: IQueryOptions = {}) {
  const setBroadcast = useBroadcastStore((state) => state.setBroadcast);
  const users: IQueryArgs<BroadCastList, IBroadcastList[]> = {
    key: ["broadcast"],
    callback: () =>
      getBroadcast().then((res) => {
        setBroadcast(res);
        return res;
      }),
  };
  return useGetResourcesQuery(users, options);
}
