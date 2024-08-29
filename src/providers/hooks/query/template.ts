import { ITemplate } from "@/typings/interface/templates";
import { IQueryArgs, IQueryOptions } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { getSingleBroadCastTemplateList, getTemplate } from "@/providers/services/templates";

export function useGetTemplate(options: IQueryOptions = {}) {
    const users: IQueryArgs<ITemplate, ITemplate[]> = {
      key: ["broadcastTemplate"],
      callback: () =>getTemplate()
    };
    return useGetResourcesQuery(users, options);
  }
  export function useGetSingleBroadCastTemplateList(id: string, options: IQueryOptions = {}) {
    const singleAutomation: IQueryArgs<ITemplate, ITemplate> = {
      key: ["singleBroadCastTemplate", { id }],
      callback: () => getSingleBroadCastTemplateList(id),
    };
    return useGetResourcesQuery(singleAutomation, options);
  }