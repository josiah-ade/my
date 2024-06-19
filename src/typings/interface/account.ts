import { StaticImageData } from "next/image";

export interface IAccountInfo {
  id: string;
  phoneNumber: string;
  description: string;
}

export interface ICreateAccount {
  phoneNumber: string;
  description: string;
}

export interface IAccount extends ICreateAccount {
  id: string;
  status: string;
  activeTill: number;
}

export interface IFileData {
  base64: string;
  expire: number;
}
export interface UserStatus {
  code: number;
  status: string;
  isConnected: boolean;
  userId: string;
  userName: string;
  isBusiness: boolean;
}

export interface IContact {
  id?: string;
  phoneNumber: string;
  description: string;
}

export interface ContactAccount {
  phoneNumber?: string;
  isBusiness?: boolean;
  name?: string;
  country?: string;
  profilePic?: StaticImageData;
  status?: string;
  id?: string;
}

interface LastMessage {
  id: string;
  type: string;
  subtype: string;
  chatId: string;
  from: string;
  fromMe: boolean;
  source: string;
  timestamp: number;
  status: string;
}

interface Participant {
  phoneNumber: string;
  rank: Record<string, any>;
}

export interface IGroupAccount {
  name: string;
  id: string;
  type: string;
  notSpam: boolean;
  lastMessage: LastMessage;
  participants: Participant[];
  createdAt: number;
  createdBy: string;
  timestamp: number;
}
