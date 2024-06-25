export interface ICreateBroadcastList {
  listName: string;
  description: string;
  dayNumber?: number;
}

export interface IBroadcastList extends ICreateBroadcastList {
  id: string;
}

export interface IBroadcastContact {
  name: string;
  phoneNumber: string;
  email: string;
  automationDay: number;
  dateJoined: string;
  id: string;
  broadcastListId: string;
}

export interface IEditBroadcastContact {
  contactName: string;
  contactEmail: string;
}
