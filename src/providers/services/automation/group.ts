import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import {
  ICreateGroupAutomation,
  IGroupAutomation,
  IGroupAutomationMessageHistory,
} from "@/typings/interface/automation/group";
import axios from "axios";

export async function createGroupAutomation(data: ICreateGroupAutomation): Promise<IGroupAutomation> {
  const messages = data.messages.map((message, index) => ({ ...message, type: data.type, sortOrder: index }));
  data.messages = messages;

  return axios
    .post<IGroupAutomation>("/automation/group", data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function editGroupAutomation(data: ICreateGroupAutomation): Promise<IGroupAutomation> {
  const messages = data.messages.map((message, index) => ({ ...message, type: data.type, sortOrder: index }));
  data.messages = messages;
  return axios
    .post<IGroupAutomation>("/automation/group", data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getGroupAutomation(): Promise<IGroupAutomation[]> {
  return axios
    .get<IGroupAutomation[]>("/automation/group")
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getGroupAutomationMessageHistory(id: string): Promise<IGroupAutomationMessageHistory[]> {
  return axios
    .get<IGroupAutomationMessageHistory[]>(`/automation/group/${id}/history`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getGroupAutomationDetail(automationId: string): Promise<IGroupAutomation> {
  return axios
    .get<IGroupAutomation>(`/automation/group/${automationId}`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function deleteGroupAutomation(automationId: string): Promise<IGenericStatusResponse> {
  return axios
    .delete<IGenericStatusResponse>(`/automation/group/${automationId}`)
    .then((response) => response.data)
    .catch(handleError);
}
