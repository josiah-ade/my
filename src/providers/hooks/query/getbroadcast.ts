import { IQueryArgs, IQueryOptions } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getBroadcast, getBroadcastDetail } from "@/providers/services/broadcast";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { IBroadcastLists } from "@/typings/interface/broadcasts";

export function useGetUserBroadcast(options: IQueryOptions = {}) {
  const setBroadcast = useBroadcastStore((state) => state.setBroadcast);
  const users: IQueryArgs<IBroadcastLists, IBroadcastLists[]> = {
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
  const users: IQueryArgs<void, IBroadcastLists> = {
    key: ["broadcast_detail", { id }],
    callback: () => getBroadcastDetail(id),
  };
  return useGetResourcesQuery(users, options);
}
