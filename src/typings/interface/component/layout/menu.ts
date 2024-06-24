import { ReactElement } from "react";
import { IconType } from "react-icons";

export interface Menu {
  title: string;
  id: string;
  icon?: IconType;
  path: string;
  disabled?: boolean;
}
export interface dashboard {
  title: string;
  id: string;
  amount: string;
  field?: string;
  total: string;
}
