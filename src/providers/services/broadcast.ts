import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { IBroadcastLists, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import axios, { AxiosResponse } from "axios";

export async function createBroadcast(data: ICreateBroadcastList): Promise<IBroadcastLists> {
  return axios
    .post<IBroadcastLists>("/broadcast", data)
    .then((response: AxiosResponse<IBroadcastLists>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getBroadcast(): Promise<IBroadcastLists[]> {
  return axios
    .get<IBroadcastLists[]>("/broadcast")
    .then((response: AxiosResponse<IBroadcastLists[]>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getBroadcastDetail(id: string): Promise<IBroadcastLists> {
  return axios
    .get<IBroadcastLists>(`/broadcast/${id}`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function deleteBroadcast(broadcastId: string): Promise<IBroadcastLists> {
  return axios
    .delete<IBroadcastLists>(`/broadcast/${broadcastId}/contacts`)
    .then((response) => response.data)
    .catch(handleError);
}
export async function editBroadcastId(data: IBroadcastLists): Promise<IBroadcastLists> {
  const payload: ICreateBroadcastList = {
    listName: data.listName,
    description: data.description,
  };

  return axios
    .put<IBroadcastLists>(`/broadcast/${data.id}`, payload)
    .then((response) => response.data)
    .catch(handleError);
}
export async function emptyBroadcastListContacts(broadcastId: string): Promise<IGenericStatusResponse> {
  return axios
    .delete<IGenericStatusResponse>(`/broadcast/${broadcastId}/contacts`)
    .then((res) => res.data)
    .catch(handleError);
}

// export async function deleteBroadcastId(broadcastId: string): Promise<> {
//   return axios
//     .delete<IGenericStatusResponse>(`/broadcast/${broadcastId}/contacts`)
//     .then((response) => response.data)
//     .catch(handleError);
// }
