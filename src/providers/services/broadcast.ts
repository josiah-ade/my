import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { IBroadcastList, ICreateBroadcastList } from "@/typings/interface/broadcasts";
import axios, { AxiosResponse } from "axios";

export async function createBroadcast(data: ICreateBroadcastList): Promise<IBroadcastList> {
  return axios
    .post<IBroadcastList>("/broadcast", data)
    .then((response: AxiosResponse<IBroadcastList>) => {
      return response.data;
    })
    .catch((e) => {
      const message = e.response?.data?.message || "Network Error";
      if (Array.isArray(message)) {
        const error = message.join("\n");
        console.log({ error });
        throw new Error(error);
      }
      throw new Error(message);
    });
}

export async function getBroadcast(): Promise<IBroadcastList[]> {
  return axios
    .get<IBroadcastList[]>("/broadcast")
    .then((response: AxiosResponse<IBroadcastList[]>) => {
      return response.data;
    })
    .catch((e) => {
      const message = e.response?.data?.message || "Network Error";
      if (Array.isArray(message)) {
        const error = message.join("\n");
        console.log({ error });
        throw new Error(error);
      }
      throw new Error(message);
    });
}

export async function getBroadcastDetail(id: string): Promise<IBroadcastList> {
  return axios
    .get<IBroadcastList>(`/broadcast/${id}`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function deleteBroadcast(id: string): Promise<IGenericStatusResponse> {
  return axios
    .delete<IGenericStatusResponse>(`/broadcast/${id}`)
    .then((response) => response.data)
    .catch(handleError);
}
