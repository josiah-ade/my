import { ContactList } from "@/core/types/data.interface";
import { IContactList } from "@/typings/interface/contacts";
import axios, { AxiosResponse } from "axios";

export async function createContact(data: IContactList): Promise<ContactList> {
  return axios
    .post<ContactList>(`/broadcast/${data.broadcastListId}/contact`, { contacts: data.contacts })
    .then((response: AxiosResponse<ContactList>) => {
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

export async function getContact(): Promise<ContactList[]> {
  return axios
    .get<ContactList[]>("/contact")
    .then((response: AxiosResponse<ContactList[]>) => {
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
