export interface ICreateFormList {
  entries: string;
  hits: string;
  formLink: string;
  name: string;
  footerDisclaimer?: string;
  list?: string;
  link?: string;
  fbCode?: string;
  description?: string;
  autoResponders?: string[];
  TOS?: string;
  confirmationMessage?: string;
  buttonText?: string;
  color?: string;
  submissions?: number;
}

export interface IFormList extends ICreateFormList {
  id?: string;
}
