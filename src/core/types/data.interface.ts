
export interface Data{
  text: string;
  icon: JSX.Element;
}

export interface TableHeader {
  field: keyof AccountData;
  title: string;
}

export interface AccountData {
  whatsAppNumber: string;
  purpose: string;
  plan: string;
  expiry: string;
  serviceStatus: string;
}

