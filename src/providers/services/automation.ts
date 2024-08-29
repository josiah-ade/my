import { handleError } from "@/components/common/exception/serviceexception";
import {  IAutomation, IAutomationContact, ICreateAutomationList, IGetAutomationSchedule } from "@/typings/interface/automation";
import axios, { AxiosResponse } from "axios";



export async function createAutomationList(data: ICreateAutomationList): Promise<IGetAutomationSchedule> {
  return axios
    .post<IGetAutomationSchedule>("/automation/list", data)
    .then((response: AxiosResponse<IGetAutomationSchedule>) => {
      return response.data;
    })
    .catch(handleError);
}


export async function getAutomationList(): Promise<IGetAutomationSchedule[]> {
    return axios
      .get<IGetAutomationSchedule[]>("/automation/list")
      .then((response: AxiosResponse<IGetAutomationSchedule[]>) => {
        return response.data;
      })
      .catch(handleError);
  }
export async function getSingleAutomationList(automationId:string): Promise<IGetAutomationSchedule> {
    return axios
      .get<IGetAutomationSchedule>(`/automation/list/${automationId}`)
      .then((response: AxiosResponse<IGetAutomationSchedule>) => {
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
  export async function editAutomationId(automationId:string, data: ICreateAutomationList): Promise<ICreateAutomationList> {
    return axios
      .put<ICreateAutomationList>(`/automation/list/${automationId}`, data)
      .then((response) => response.data)
      .catch(handleError);
  }