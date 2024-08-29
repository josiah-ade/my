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

export interface ICreateFieldOption {
  title: string;
  sort_order: number;
}

export interface ICreateFormField {
  id?: string;
  isDefault: boolean;
  formId: any;
  type: string;
  title: string;
  source: string;
  sort_order: number;
  status: string;
  is_required: boolean;
  options?: ICreateFieldOption[];
}

export interface ICreateForm {
  map(arg0: (q: any) => any): unknown;
  name: string;
  id?: string;
  footerDisclaimer: string;
  list: string;
  link: string;
  fbCode: string;
  description: string;
  autoResponders: string[];
  TOS: string;
  confirmationMessage: string;
  buttonText: string;
  color: string;
  hits: number;
  submissions: number;
  fields: ICreateFormField[];
}

export interface IFormList extends ICreateForm {
  id?: string;
  businessId?: string;
  formFields?: ICreateFormField[];
  entries?: number;
}

export interface IFormFilter {
  link: string;
}

export interface SubmitField {
  fieldId: string;
  fieldName?: string;
  value: string;
}

export interface ISubmitForm {
  formId: string;
  fields: SubmitField[];
}

export interface ISumitedForm {
  fieldId: string;
  value: string;
  fieldName: string;
}

export interface AllFormEntries {
  formId: string;
  fieldName: string;
  fields: SubmitField[];
}
