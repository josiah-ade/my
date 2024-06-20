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
