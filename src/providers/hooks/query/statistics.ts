import { getStatsDetails } from "@/providers/services/statists";
import { useGetResourcesQuery } from "../helper/query";
import { IQueryArgs, IQueryOptions } from "@/typings/query";
import { ILimitData, Limit } from "@/typings/interface/component/layout/menu";
import { useLimitsStore } from "@/providers/stores/statisticsStore";
// import { useAutomationStore } from "@/providers/stores/statisticsStore";

export function useUsersStats(options: IQueryOptions = {}) {
  const setLimitStore = useLimitsStore((state) => state.setLimitStore);
  const usersStats: IQueryArgs<Limit, ILimitData> = {
    key: ["stats", ],
    callback: () => getStatsDetails().then((res) => {
      setLimitStore(res);
      return res;
    }),
  };
  return useGetResourcesQuery(usersStats);
}
