import { IAutomationContact, IListAutomation } from "@/typings/interface/automation";
import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../../helper/query";
import {
  getAutomationList,
  getListAutomationHistory,
  getSingleAutomationList,
} from "@/providers/services/automation/list";
import { useAutomationStore } from "@/providers/stores/automation";
import { IListAutomationMessage } from "@/typings/interface/automation/list";

export function useGetUserAutomation(options: IQueryOptions = {}) {
  const setAutomation = useAutomationStore((state) => state.setAutomation);
  const users: IQueryArgs<IListAutomation, IListAutomation[]> = {
    key: ["listAutomation"],
    callback: () =>
      getAutomationList().then((res) => {
        setAutomation(res);
        return res;
      }),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetSingleAutomationList(id: string, options: IQueryOptions = {}) {
  const singleAutomation: IQueryArgs<IListAutomation, IListAutomation> = {
    key: ["singleListAutomation", { id }],
    callback: () => getSingleAutomationList(id),
  };
  return useGetResourcesQuery(singleAutomation, options);
}

export function useGetListAutomationMessageHistory(id: string, options: IQueryOptions = {}) {
  const queryArgs: IQueryArgs<void, IListAutomationMessage[]> = {
    key: ["listAutomationHistory", { id }],
    callback: () => getListAutomationHistory(id),
  };
  return useGetResourcesQuery(queryArgs, options);
}
