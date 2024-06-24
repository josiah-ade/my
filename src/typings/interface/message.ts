export interface IBroadcastMessage {
  broadcastIds: string[];
  accountId: string;
  text: string;
  files: string[];
}

export interface ICreateBroadcastMessage {
  broadcastIds: string[];
  accountId: string;
  text: string;
  files: string[];
}

export interface IMessageResponse {
  data: IBroadcastMessage;
}
