import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Data {
  text: string;
  icon: JSX.Element;
}

export interface TableHeader {
  field: string;
  title: string;
  icon?: string;
  action?: {
    text: string;
    type?: "Button" | "dropdoen";
    style?: string;
    href?: string;
  };
}

export interface AccountData {
  whatsAppNumber: string;
  purpose: string;
  plan: string;
  id: string;
  img?: StaticImageData;
  expiry: string;
  serviceStatus: string;
}

export interface BroadCastList {
  listName: string;
  id: string;
  description: string;
  contacts?: number;
}
export interface IBroadCastList {
  listName: string;
  id: string;
  description: string;
}
export interface ContactList {
  PhoneNumber: string;
  purpose: string;
  plan: string;
  img:StaticImageData,
}

