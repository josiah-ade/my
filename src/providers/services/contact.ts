import { handleError } from "@/components/common/exception/serviceexception";
import { removeNullValue } from "@/core/services";
import { ContactList } from "@/core/types/data.interface";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { IBroadcastContact, IEditBroadcastContact } from "@/typings/interface/broadcasts";
import { IContactList } from "@/typings/interface/contacts";
import axios, { AxiosResponse } from "axios";

export async function createContact(data: IContactList): Promise<ContactList> {
  return axios
    .post<ContactList>(`/broadcast/${data.broadcastListId}/contact`, {
      contacts: data.contacts,
      automatedDay: data.automatedDay,
    })
    .then((response: AxiosResponse<ContactList>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getBroadcastContact(id: string): Promise<IBroadcastContact[]> {
  return axios
    .get<IBroadcastContact[]>(`/broadcast/${id}/contact`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function deleteContact(contact: IBroadcastContact): Promise<IGenericStatusResponse> {
  return axios
    .delete<IGenericStatusResponse>(`/broadcast/${contact.broadcastListId}/contact/${contact.id}`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function editContact(contact: IBroadcastContact): Promise<IBroadcastContact> {
  const payload: IEditBroadcastContact = {
    contactName: contact.name,
    contactEmail: contact.email,
    automationDay: contact.automationDay,
  };
  return axios
    .put<IBroadcastContact>(`/broadcast/${contact.broadcastListId}/contact/${contact.id}`, removeNullValue(payload))
    .then((response) => response.data)
    .catch(handleError);
}
