import { useQuery, useMutation, useQueryClient } from "react-query";
import { getBroadcastMessages, createBroadcastMessage } from "@/providers/services/message";
import { IBroadcastMessage, ICreateBroadcastMessage } from "@/typings/interface/message";
import { IQueryArgs } from "@/typings/query";
import { useGetResourcesQuery } from "../helper/query";

// export function useBroadcastMessages() {
//   const users: IQueryArgs<ICreateBroadcastMessage, IBroadcastMessage[]> = {
//     key: ["broadcastmessage"],
//     callback: () => getBroadcastMessages(),
//   };
//   return useGetResourcesQuery(users);
// }
