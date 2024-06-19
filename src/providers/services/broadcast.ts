import { AccountData, BroadCastList, IBroadCastList } from "@/core/types/data.interface";
import { IAccountInfo, IAccount } from "@/typings/interface/account";
import axios, { AxiosResponse } from "axios";

export async function createBroadcast(data: BroadCastList): Promise<IBroadCastList> {
    return axios
      .post<IBroadCastList>("/broadcast", data)
      .then((response: AxiosResponse<IBroadCastList>) => {
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
export async function getBroadcast(): Promise<IBroadCastList[]> {
    return axios
      .get<IBroadCastList[]>("/broadcast")
      .then((response: AxiosResponse<IBroadCastList[]>) => {
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