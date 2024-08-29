import { ISubscriptionPackage, SubscriptionHistory } from "@/typings/interface/subscription";
import { IQueryArgs, IQueryOptions } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getSubScription, getSubScriptionHistory } from "@/providers/services/subscription";

export function useGetSubscription(options: IQueryOptions = {}) {
  const users: IQueryArgs<ISubscriptionPackage, ISubscriptionPackage[]> = {
    key: ["subscription"],
    callback: () => getSubScription(),
  };
  return useGetResourcesQuery(users, options);
}
export function useGetSubscriptionHistory(options: IQueryOptions = {}) {
  const users: IQueryArgs<SubscriptionHistory, SubscriptionHistory[]> = {
    key: ["subscriptionHistory"],
    callback: () => getSubScriptionHistory(),
  };
  return useGetResourcesQuery(users, options);
}
