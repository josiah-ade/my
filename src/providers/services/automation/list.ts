import { handleError } from "@/components/common/exception/serviceexception";
import {  ICreateAutomationList, IListAutomation } from "@/typings/interface/automation";
import axios, { AxiosResponse } from "axios";



export async function createAutomationList(data: ICreateAutomationList): Promise<IListAutomation> {
  return axios
    .post<IListAutomation>("/automation/list", data)
    .then((response: AxiosResponse<IListAutomation>) => {
      return response.data;
    })
    .catch(handleError);
}


export async function getAutomationList(): Promise<IListAutomation[]> {
    return axios
      .get<IListAutomation[]>("/automation/list")
      .then((response: AxiosResponse<IListAutomation[]>) => {
        return response.data;
      })
      .catch(handleError);
  }
export async function getSingleAutomationList(automationId:string): Promise<IListAutomation> {
    return axios
      .get<IListAutomation>(`/automation/list/${automationId}`)
      .then((response: AxiosResponse<IListAutomation>) => {
        return response.data;
      })
      .catch(handleError);
  }
  export async function deleteAutomation(automationId: string): Promise<string> {
    return axios
      .delete<string>(`/automation/list/${automationId}`)
      .then((response) => response.data)
      .catch(handleError);
  }
  export async function editAutomationId(automationId:string, data: ICreateAutomationList): Promise<ICreateAutomationList> {
    return axios
      .put<ICreateAutomationList>(`/automation/list/${automationId}`, data)
      .then((response) => response.data)
      .catch(handleError);
  }