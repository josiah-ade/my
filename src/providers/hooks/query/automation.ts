import {  IAutomationContact } from "@/typings/interface/automation";
import { IQueryOptions, IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getAutomationList } from "@/providers/services/automation";
import { useAutomationStore } from "@/providers/stores/automation";

export function useGetUserAutomation(options: IQueryOptions = {}) {
  const setAutomation = useAutomationStore((state) => state.setAutomation);
    const users: IQueryArgs<IAutomationContact, IAutomationContact[]> = {
      key: ["broadcast"],
      callback: () =>getAutomationList().then((res) => {
        setAutomation(res);
                return res;
              }),
    };
    return useGetResourcesQuery(users, options);
  }