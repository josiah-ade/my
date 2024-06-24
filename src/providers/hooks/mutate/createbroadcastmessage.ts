import { useMutation, useQueryClient } from "react-query";
import { createBroadcastMessage } from "@/providers/services/message";
import { ICreateBroadcastMessage, IBroadcastMessage } from "@/typings/interface/message";

interface IMutationHook {
  onSuccess?: (data: IBroadcastMessage) => void;
  onError?: (error: Error) => void;
}

export function useCreateBroadcastMessage({ onSuccess, onError }: IMutationHook) {
  const queryClient = useQueryClient();

  return useMutation<IBroadcastMessage, Error, ICreateBroadcastMessage>(
    (data: ICreateBroadcastMessage) => createBroadcastMessage(data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("broadcastMessages");
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        if (onError) onError(error);
      },
    }
  );
}
