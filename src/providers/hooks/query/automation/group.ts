import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../../helper/query";
import { getGroupAutomation, getGroupAutomationDetail } from "@/providers/services/automation/group";
import { IGroupAutomation } from "@/typings/interface/automation/group";

export function useGetGroupAutomation(options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IGroupAutomation[]> = {
    key: ["groupAutomation"],
    callback: () => getGroupAutomation(),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetGroupAutomationDetails(id: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<void, IGroupAutomation> = {
    key: ["groupAutomationDetail", { id }],
    callback: () => getGroupAutomationDetail(id),
  };
  return useGetResourcesQuery(users, options);
}
