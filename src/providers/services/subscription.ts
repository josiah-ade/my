import { handleError } from "@/components/common/exception/serviceexception";
import { IGenericStatusResponse } from "@/typings/interface/api";
import { IInitiatePayment, IPaymentResponse, ISubscriptionPackage, IVerifyPayment, SubscriptionHistory } from "@/typings/interface/subscription";
import axios, { AxiosResponse } from "axios";

export async function getSubScription(): Promise<ISubscriptionPackage[]> {
  return axios
    .get<ISubscriptionPackage[]>("/plan")
    .then((response: AxiosResponse<ISubscriptionPackage[]>) => {
      return response.data;
    })
    .catch(handleError);
}

export async function initiatePayment(payload: IInitiatePayment): Promise<IPaymentResponse> {
  return axios
  .post<IPaymentResponse>("/subscription/initialize", payload)
  .then((response) => {
    return response.data;
  })
  .catch(handleError);
}

export async function verifyPayment(payload: IVerifyPayment): Promise<IGenericStatusResponse> {
  return axios
  .post<IGenericStatusResponse>("/subscription/verify", payload)
  .then((response) => {
    return response.data;
  })
  .catch(handleError);
}

export async function getSubScriptionHistory(): Promise<SubscriptionHistory[]> {
  return axios
    .get<SubscriptionHistory[]>("/subscription")
    .then((response: AxiosResponse<SubscriptionHistory[]>) => {
      return response.data;
    })
    .catch(handleError);
}