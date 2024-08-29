import { IGenericStatusResponse } from "@/typings/interface/api";
import { IMutationArgs, IMutationHook } from "../../../typings/query";
import { useCreateResources } from "../helper/mutation";
import { initiatePayment, verifyPayment } from "@/providers/services/subscription";
import { IInitiatePayment, IPaymentResponse, IVerifyPayment } from "@/typings/interface/subscription";

export function useInitiatePayment({ onSuccess, onError, options }: IMutationHook<IPaymentResponse>) {
  const mutation: IMutationArgs<IInitiatePayment, IPaymentResponse> = {
    key: ["subscription"],
    callback: (data: IInitiatePayment) => initiatePayment(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}

export function useVerifyPayment({ onSuccess, onError, options }: IMutationHook<IGenericStatusResponse>) {
  const mutation: IMutationArgs<IVerifyPayment, IGenericStatusResponse> = {
    key: ["subscription"],
    callback: (data: IVerifyPayment) => verifyPayment(data),
    onSuccess: onSuccess,
    onError: onError,
    options,
  };
  return useCreateResources(mutation);
}
