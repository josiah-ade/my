import { IQueryArgs, IQueryOptions } from "../../../typings/query";
import { useGetResourcesQuery } from "../helper/query";
import { AllFormEntries, IFormList, ISubmitForm } from "@/typings/interface/form";
import {
  getAllFormEntries,
  getCreatedForm,
  getForm,
  getFormDetail,
  getSingleEntries,
} from "@/providers/services/userForm";
import { useFormStore } from "@/providers/stores/formStore";

export function useGetForm(options: IQueryOptions = {}) {
  const setFormList = useFormStore((state) => state.setFormList);
  const users: IQueryArgs<IFormList, IFormList[]> = {
    key: ["form"],
    callback: () =>
      getForm().then((res) => {
        setFormList(res);
        return res;
      }),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetFormDetails(id: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<IFormList, IFormList> = {
    key: ["form", { id }],
    callback: () =>
      getFormDetail(id).then((res) => {
        return res;
      }),
  };
  return useGetResourcesQuery(users, options);
}

export function useGetCreateForm(params: string) {
  const users: IQueryArgs<void, IFormList> = {
    key: ["formLink", { params }],
    callback: () =>
      getCreatedForm(params).then((res) => {
        return res;
      }),
  };
  return useGetResourcesQuery(users);
}

export function useGetAllEntries(formId: string, options: IQueryOptions = {}) {
  const query: IQueryArgs<void, AllFormEntries[]> = {
    key: ["allFormEntries", { formId }],
    callback: () => getAllFormEntries(formId),
  };
  return useGetResourcesQuery(query, options);
}

export function useGetSingleEntries(formId: string, options: IQueryOptions = {}) {
  const users: IQueryArgs<ISubmitForm, ISubmitForm[]> = {
    key: ["singleFormEntries", { formId }],
    callback: () => getSingleEntries(formId),
  };
  return useGetResourcesQuery(users, options);
}
