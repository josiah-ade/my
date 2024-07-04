import { IAutomation, IAutomationContact } from "@/typings/interface/automation";
import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getAutomationList } from "@/providers/services/automation";

export function useGetUserAutomation(options: IQueryOptions = {}) {
    const users: IQueryArgs<IAutomationContact, IAutomationContact[]> = {
      key: ["broadcast"],
      callback: () =>getAutomationList()
    };
    return useGetResourcesQuery(users, options);
  }