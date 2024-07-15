import axios from "axios";
import { ICreateBroadcastMessage, IMessageResponse, IMessageListResponse } from "@/typings/interface/message";
import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { removeNullValue } from "@/core/services";
import { IAPIFilter } from "@/typings/query";

export interface IMessageFilter extends IAPIFilter {
  // type: string| 'list' | 'group' | 'automation' | 'BOT' | "" ;
  type: string;
}

export async function createBroadcastMessage(data: ICreateBroadcastMessage): Promise<IGenericStatusResponse> {
  const formData = new FormData();
  const { list, tags, excludeList, sendToIndividual, isTest, files, ...cleanData } = removeNullValue(data, true);

  Object.entries(cleanData).forEach(([field, value]) => {
    formData.append(field, value ?? "");
  });

  formData.append("isTest", `${isTest}`);
  formData.append("sendToIndividual", `${sendToIndividual}`);
  [
    { name: "broadcastIds", value: list },
    { name: "tags", value: tags },
    { name: "excludeList", value: excludeList },
    { name: "sendToIndividual", value: excludeList },
  ].forEach((list) => {
    if (list.value && list.value.length) {
      list.value.forEach((item) => formData.append(list.name, item));
      formData.append(list.name, "");
    }
  });

  files && files.forEach((value) => formData.append("files", value, value.name));

  return axios
    .post<IGenericStatusResponse>("/message", formData)
    .then((response) => response.data)
    .catch(handleError);
}

// Function to fetch all broadcast messages
export async function getBroadcastMessages(params: IMessageFilter): Promise<IMessageResponse[]> {
  return axios
    .get<IMessageResponse[]>("/message", { params })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getBroadcastMessageDetail(id: string): Promise<IMessageResponse> {
  return axios
    .get<IMessageResponse>(`/message/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getBroadcastMessageList(id: string): Promise<IMessageListResponse[]> {
  return axios
    .get<IMessageListResponse[]>(`/message/${id}/list`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}
