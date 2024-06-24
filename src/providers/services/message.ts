import axios, { AxiosResponse } from "axios";
import { ICreateBroadcastMessage, IBroadcastMessage } from "@/typings/interface/message";

// Function to create a new broadcast message
export async function createBroadcastMessage(
  data: ICreateBroadcastMessage
): Promise<ICreateBroadcastMessage> {
  return axios
    .post<IBroadcastMessage>("/message", data)
    .then((response: AxiosResponse<ICreateBroadcastMessage>) => {
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

// Function to fetch all broadcast messages
export async function getBroadcastMessages(): Promise<IBroadcastMessage> {
  return axios
    .get<IBroadcastMessage>("/message")
    .then((response: AxiosResponse<IBroadcastMessage>) => {
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
