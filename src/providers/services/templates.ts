import { handleError } from "@/components/common/exception/serviceexception";
import { ICreateTemplate, ITemplate } from "@/typings/interface/templates";
import axios, { AxiosResponse } from "axios";

export async function createTemplateList(data: ICreateTemplate): Promise<ICreateTemplate> {
    return axios
        .post<ICreateTemplate>("/template/broadcast", data)
        .then((response: AxiosResponse<ICreateTemplate>) => {
            return response.data;
        })
        .catch(handleError);
}

export async function getTemplate(): Promise<ITemplate[]> {
    return axios
        .get<ITemplate[]>("/template/broadcast")
        .then((response: AxiosResponse<ITemplate[]>) => {
            return response.data;
        })
        .catch(handleError);
}
export async function getSingleBroadCastTemplateList(templateId: string): Promise<ITemplate> {
    return axios
      .get<ITemplate>(`/template/broadcast/${templateId}`)
      .then((response: AxiosResponse<ITemplate>) => {
        return response.data;
      })
      .catch(handleError);
  }
export async function deleteTemplate(templateId: string): Promise<string> {
    return axios
        .delete<string>(`/template/broadcast/${templateId}`)
        .then((response) => response.data)
        .catch(handleError);
}
export async function editTemplate(templateId: string, data: ICreateTemplate): Promise<ICreateTemplate> {
    return axios
        .put<ICreateTemplate>(`/template/broadcast/${templateId}`, data)
        .then((response) => response.data)
        .catch(handleError);
}