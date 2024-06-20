export interface ICreateBroadcastList {
  listName: string;
  description: string;
  dayNumber?: number;
}

export interface IBroadcastList extends ICreateBroadcastList {
  id: string;
}
