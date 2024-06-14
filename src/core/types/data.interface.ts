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
  // first: string;
  // second: string;
  // third: string;
  // fourth: string;
  // fifth: string;
  whatsAppNumber: string;
  purpose: string;
  plan: string;
  img?: StaticImageData;
  expiry: string;
  serviceStatus: string;
}

export interface BroadCastList {
  listName: string;
  id: string;
  description: string;
  contacts?: number;
  // view: string;
}
