import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Data{
  text: string;
  icon: JSX.Element;
}

export interface TableHeader {
  field: keyof AccountData;
  title: string;
  icon:ReactNode;
  icons:ReactNode;
}

export interface AccountData{
  whatsAppNumber: string;
  purpose: string;
  plan: string;
  expiry: string;
  serviceStatus: string;
  img:StaticImageData;
}

