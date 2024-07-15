import { getBroadcastMessageDetail, getBroadcastMessageList, getBroadcastMessages, IMessageFilter } from "@/providers/services/message";
import { IMessageListResponse, IMessageResponse } from "@/typings/interface/message";
import { IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";

export function useGetBroadcastMessages(  params: IMessageFilter,){
  const queryOptions: IQueryArgs<void, IMessageResponse[]> = {
    key: ["broadcastMessage",  params],
    callback: () => getBroadcastMessages(params),
  };
  return useGetResourcesQuery(queryOptions);
}

export function useGetBroadcastMessagesDetail(id: string) {
  const queryOptions: IQueryArgs<void, IMessageResponse> = {
    key: ["broadcastMessageDetail", { id }],
    callback: () => getBroadcastMessageDetail(id),
  };
  return useGetResourcesQuery(queryOptions);
}

export function useGetBroadcastMessagesList(id: string) {
  const queryOptions: IQueryArgs<void, IMessageListResponse[]> = {
    key: ["broadcastMessageList", { id }],
    callback: () => getBroadcastMessageList(id),
  };
  return useGetResourcesQuery(queryOptions);
}
