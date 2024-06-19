import { AccountData } from "@/core/types/data.interface";
import { ICreateAccount, IAccount, IFileData, UserStatus, IContact, ContactAccount, IGroupAccount, } from "@/typings/interface/account";
import { Tabdetails } from "@/typings/interface/component/tab/tabdetails";
import axios, { AxiosResponse } from "axios";

export async function createAccount(data: ICreateAccount): Promise<IAccount> {
    return axios
      .post<IAccount>("/account", data)
      .then((response: AxiosResponse<IAccount>) => {
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
export async function getAccount(): Promise<IAccount[]> {
    return axios
      .get<IAccount[]>("/account")
      .then((response: AxiosResponse<IAccount[]>) => {
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
export async function getSingleAccount(id: string): Promise<IAccount> {
    return axios
      .get<IAccount>(`/account/${id}`)
      .then((response: AxiosResponse<IAccount>) => {
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
export async function getQrCodeUserAccount(id: string): Promise<IFileData> {
    return axios
      .get<IFileData>(`/account/${id}/qr_code`)
      .then((response: AxiosResponse<IFileData>) => {
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
export async function getUserStatusAccount(id: string): Promise<UserStatus> {
    return axios
      .get<UserStatus>(`/account/${id}/status`)
      .then((response: AxiosResponse<UserStatus>) => {
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
export async function getUsercontactAccount(id: string): Promise<ContactAccount[]> {
    return axios
      .get<ContactAccount[]>(`/account/${id}/contacts`)
      .then((response: AxiosResponse<ContactAccount[]>) => {
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
export async function getGroupAccount(id: string): Promise<IGroupAccount[]> {
    return axios
      .get<IGroupAccount[]>(`/account/${id}/groups`)
      .then((response: AxiosResponse<IGroupAccount[]>) => {
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
export async function disconnectsingleuserAccount(id: string): Promise<ContactAccount> {
    return axios
      .get<ContactAccount>(`/account/${id}/disconnect`)
      .then((response: AxiosResponse<ContactAccount>) => {
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