import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../../helper/query";
import {
  getGroupAutomation,
  getGroupAutomationDetail,
  getGroupAutomationMessageHistory,
} from "@/providers/services/automation/group";
import { IGroupAutomation, IGroupAutomationMessageHistory } from "@/typings/interface/automation/group";

export function useGetGroupAutomation(options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IGroupAutomation[]> = {
    key: ["groupAutomation"],
    callback: () => getGroupAutomation(),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetGroupAutomationDetails(id: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IGroupAutomation> = {
    key: ["groupAutomation", { id }],
    callback: () => getGroupAutomationDetail(id),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetGroupAutomationMessageHistory(id: string, options: IQueryOptions = {}) {
  const queryArgs: IQueryArgs<void, IGroupAutomationMessageHistory[]> = {
    key: ["groupAutomationHistory", { id }],
    callback: () => getGroupAutomationMessageHistory(id),
  };
  return useGetResourcesQuery(queryArgs, options);
}
