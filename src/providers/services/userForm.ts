import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { AllFormEntries, ICreateForm, IFormList, ISubmitForm } from "@/typings/interface/form";
import axios, { AxiosResponse } from "axios";

export async function createForm(data: ICreateForm): Promise<ICreateForm> {
  data.fields = data.fields.map((item, index) => ({ ...item, sort_order: index }));
  return axios
    .post<ICreateForm>("/form", data)
    .then((response: AxiosResponse<ICreateForm>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getForm(): Promise<IFormList[]> {
  return axios
    .get<IFormList[]>("/form/all")
    .then((response: AxiosResponse<IFormList[]>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getFormDetail(id: string): Promise<IFormList> {
  return axios
    .get<IFormList>(`/form/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function EditForm(data: IFormList): Promise<IFormList> {
  data.fields = data.fields.map((item, index) => ({ ...item, sort_order: index }));

  return axios
    .put<IFormList>(`/form/${data.id}`, data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function deleteForm(id: string): Promise<IFormList> {
  return axios
    .delete<IFormList>(`/form/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getCreatedForm(params: string): Promise<IFormList> {
  return axios
    .get<IFormList>("form", { params: { link: params } })
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function CreateSubmitForm(data: ISubmitForm): Promise<ISubmitForm> {
  return axios
    .post<ISubmitForm>(`/form/${data.formId}/submission`, data)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getSingleEntries(id: string): Promise<ISubmitForm[]> {
  return axios
    .get<ISubmitForm[]>(`/form/${id}/submission`)
    .then((response) => {
      return response.data;
    })
    .catch(handleError);
}

export async function getAllFormEntries(id: string): Promise<AllFormEntries[]> {
  return axios
    .get<AllFormEntries[]>(`/form/${id}/submission/group`)
    .then((response) => response.data)
    .catch(handleError);
}
