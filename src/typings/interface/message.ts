export interface IBroadcastMessage {
  broadcastIds: string[];
  accountId: string;
  text: string;
  files: string[];
}

export interface ICreateBroadcastMessage {
  list: string[];
  accountId: string;
  text: string;
  type: "group" | "list" | "";
  files?: File[];
  testNumber?: string;
  sendToIndividual?: boolean;
  joinedFrom?: string;
  joinedTo?: string;
  tags?: string[];
  tagCondition?: string;
  excludeList?: string[];
  isTest?: boolean;
  individual?: string;
}

export interface ISendTestBroadcastMessage {
  accountId: string;
  text: string;
  files?: File[];
  testPhoneNumber?: string;
}

export interface IMessageResponse {
  broadcastDetail: {
    id: string;
    listName: string;
    description: string;
  }[];
  id: string;
  text: string;
  status: string;
  createdAt: string;
  queuedTime?: string;
  completedTime?: string;
  account: {
    phoneNumber: string;
    description: string;
    status: string;
    id: string;
  };
  totalMessages: number;
  stats: { [key: string]: number };
}

export interface IMessageListResponse {
  receiverNumber: string;
  comment: string;
  sentTime: string;
  deliveredTime: string;
  readTime: string;
  queuedTime: string;
  status: string;
}
