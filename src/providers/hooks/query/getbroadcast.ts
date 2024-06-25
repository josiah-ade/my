import { IQueryArgs, IQueryOptions } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { BroadCastList } from "@/core/types/data.interface";
import { getBroadcast, getBroadcastDetail } from "@/providers/services/broadcast";
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

export function useGetBroadcastDetail(id: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<BroadCastList, IBroadcastList> = {
    key: ["broadcast_detail"],
    callback: () => getBroadcastDetail(id),
  };
  return useGetResourcesQuery(users, options);
}
