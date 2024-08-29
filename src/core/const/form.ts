import { ICreateFieldOption, ICreateForm } from "@/typings/interface/form";

export const DEFAULT_FORM_VALUE: ICreateForm = {
  name: "",
  footerDisclaimer: "",
  list: "",
  link: "",
  fbCode: "",
  description: "",
  autoResponders: [""],
  TOS: "",
  confirmationMessage: "",
  buttonText: "",
  color: "",
  hits: 0,
  submissions: 0,
  fields: [
    {
      type: "email",
      title: "Email",
      sort_order: 0,
      source: "email",
      status: "active",
      is_required: true,
      isDefault: true,
      options: [],
      formId: undefined,
      id: undefined,
    },
    {
      type: "tel",
      title: "Phone Number",
      sort_order: 1,
      source: "tel",
      status: "status",
      is_required: true,
      options: [],
      isDefault: true,
      formId: undefined,
      id: undefined,
    },
  ],
  map: function (arg0: (q: any) => any): unknown {
    throw new Error("Function not implemented.");
  },
};

export const DEFAULT_FORM_OPTIONS: ICreateFieldOption = { title: "", sort_order: 0 };
