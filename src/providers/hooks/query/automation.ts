import {  IAutomationContact, IListAutomation } from "@/typings/interface/automation";
import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getAutomationList, getSingleAutomationList } from "@/providers/services/automation/list";
import { useAutomationStore } from "@/providers/stores/automation";

export function useGetUserAutomation(options: IQueryOptions = {}) {
  const setAutomation = useAutomationStore((state) => state.setAutomation);
    const users: IQueryArgs<IListAutomation, IListAutomation[]> = {
      key: ["listAutomation"],
      callback: () =>getAutomationList().then((res) => {
        setAutomation(res);
                return res;
              }),
    };
    return useGetResourcesQuery(users, options);
  }
export function useGetSingleAutomationList(id: string,options: IQueryOptions = {}) {
    const singleAutomation: IQueryArgs<IListAutomation, IListAutomation> = {
      key: ["singleListAutomation"],
      callback: () =>getSingleAutomationList(id)
    };
    return useGetResourcesQuery(singleAutomation, options);
  }