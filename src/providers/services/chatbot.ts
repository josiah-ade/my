import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { ChatbotMigrate, IChatBot, ICreateChatBot } from "@/typings/interface/chatbot";
import axios from "axios";

export async function createChatBot(data: ICreateChatBot): Promise<IChatBot> {
  const messages = data.messages.map((message, index) => ({ ...message, type: data.type, sortOrder: index }));
  data.messages = messages;

  return axios
    .post<IChatBot>("/chatbot", data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function editChatBot(id: string, data: ICreateChatBot): Promise<IChatBot> {
  const messages = data.messages.map((message, index) => ({ ...message, type: data.type, sortOrder: index }));
  data.messages = messages;
  return axios
    .put<IChatBot>(`/chatbot/${id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getChatBot(): Promise<IChatBot[]> {
  return axios
  .get<IChatBot[]>("/chatbot")
  .then((response) => {
    return response.data;
  })
  .catch(handleError);
}

export async function migrateChatBot( data: ChatbotMigrate): Promise<IChatBot> {
  return axios
    .put<IChatBot>(`/chatbot/migrate`, data)
    .then((response) => {
      console.log(response.data)
      return response.data;
    })
    .catch(handleError);
}

// export async function getChatBotMessageHistory(id: string): Promise<IChatBotMessageHistory[]> {
//   return axios
//     .get<IChatBotMessageHistory[]>(`/chatbot/${id}/history`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch(handleError);
// }

export async function getChatBotDetail(automationId: string): Promise<IChatBot> {
  return axios
    .get<IChatBot>(`/chatbot/${automationId}`)
    .then((response) => response.data)
    .catch(handleError);
}

export async function deleteChatBot(automationId: string): Promise<IGenericStatusResponse> {
  return axios
    .delete<IGenericStatusResponse>(`/chatbot/${automationId}`)
    .then((response) => response.data)
    .catch(handleError);
}
