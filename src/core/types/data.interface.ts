import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Data {
  text: string;
  icon: JSX.Element;
}

export interface TableHeader {
  field: String;
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
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

export interface BroadCastList {
  listName: string;
  id: string;
  description: string;
  // contact?: string;
  // view: string;
}
export interface ContactList {
  PhoneNumber: string;
  purpose: string;
  plan: string;
  img:StaticImageData,
  // contact?: string;
  // view: string;
}

