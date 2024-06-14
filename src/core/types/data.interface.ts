import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface Data{
  text: string;
  icon: JSX.Element;
}

export interface TableHeader {
  field: keyof AccountData;
  title: string;
  icon?: string
}

export interface AccountData {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

