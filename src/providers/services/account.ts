import { handleError } from "@/components/common/exception/serviceexception";
import {
  ICreateAccount,
  IAccount,
  IFileData,
  UserStatus,
  ContactAccount,
  IGroupAccount,
  Participant,
} from "@/typings/interface/account";
import { IGenericStatusResponse } from "@/typings/interface/api";
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

export async function deleteAccount(id: string): Promise<IAccount> {
  return axios
    .delete<IAccount>(`/account/${id}`)
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

export async function getsingleGroupContact(id: string, groupId: string): Promise<Participant[]> {
  return axios
    .get<Participant[]>(`/account/${id}/groups/${groupId}`)
    .then((response: AxiosResponse<Participant[]>) => {
      return response.data;
    })
    .catch(handleError);
  // .catch((e) => {
  //   const message = e.response?.data?.message || "Network Error";
  //   if (Array.isArray(message)) {
  //     const error = message.join("\n");
  //     console.log({ error });
  //     throw new Error(error);
  //   }
  //   throw new Error(message);
  // });
}

export async function disconnectAccount(id: string): Promise<IGenericStatusResponse> {
  return axios
    .post(`/account/${id}/disconnect`, {})
    .then((response: AxiosResponse<IGenericStatusResponse>) => {
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
