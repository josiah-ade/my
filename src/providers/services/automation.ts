import { handleError } from "@/components/common/exception/serviceexception";
import {  IAutomation, IAutomationContact, ICreateAutomationList } from "@/typings/interface/automation";
import axios, { AxiosResponse } from "axios";



export async function createAutomationList(data: ICreateAutomationList): Promise<IAutomationContact> {
  return axios
    .post<IAutomationContact>("/automation/list", data)
    .then((response: AxiosResponse<IAutomationContact>) => {
      return response.data;
    })
    .catch(handleError);
}


export async function getAutomationList(): Promise<IAutomationContact[]> {
    return axios
      .get<IAutomationContact[]>("/automation/list")
      .then((response: AxiosResponse<IAutomationContact[]>) => {
        return response.data;
      })
      .catch(handleError);
  }
  export async function deleteAutomation(automationId: string): Promise<IAutomation> {
    return axios
      .delete<IAutomation>(`/automation/list/${automationId}`)
      .then((response) => response.data)
      .catch(handleError);
  }