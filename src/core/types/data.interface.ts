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
    text?: string;
    type?: "Button" | "dropdoen";
    style?: string;
    href?: string;
    avatar?: string;
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
  contacts?: string;
  // view: string;
}

export interface ContactList {
  name: string;
  phone: string;
  email: string;
}

export interface WhatsappContact {
  phoneNumber: string;
  name: string;
  country: string;
  avatar: string;
  selected: boolean;
}

export interface NewCustomerType {
  phoneNumber?: string;
  name?: string;
  dateJoined?: string;
  tags?: string;
  automationDay?: number;
}

export interface TableRowBroadcast {
  message: string;
  lists: string[];
  inQueue?: number;
  delivered?: number;
  failed?: number;
  paused?: number;
  sentToQueue: string;
  deliveredTime: string;
  actions?: string;
  status?: string;
}

export interface HeaderBroadcast {
  title: string;
  field: string;
}

export interface FormData {
  message: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  files: File[];
}

export interface List {
  name: string;
  contacts: number;
  selected: boolean;
}

export interface ListSelectorProps {
  lists: List[];
  onToggle: (index: number) => void;
  onSelectAll: () => void;
}

export interface FileUpload {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "success" | "error";
  progress: number;
  error?: string;
}

export interface FileUploadProps {
  uploads: FileUpload[];
  onFileSelect: (files: FileList) => void;
  onRetry: (file: FileUpload) => void;
}

interface UploadStore {
  uploads: FileUpload[];
  addUpload: (file: File) => void;
  updateUploadProgress: (id: string, progress: number) => void;
  setUploadSuccess: (id: string) => void;
  setUploadError: (id: string, error: string) => void;
  retryUpload: (file: FileUpload) => void;
}
