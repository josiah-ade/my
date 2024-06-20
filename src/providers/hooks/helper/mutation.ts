import { IMutationArgs } from "../../../typings/query";
import { QueryClient, useMutation, useQueryClient } from "react-query";

export function useCreateResources<IArg, IReturn, TError>({
  callback,
  key,
  onSuccess,
  onSettled,
  onError,
}: IMutationArgs<IArg, IReturn, TError>) {
  const queryClient = useQueryClient();
  return useMutation(
    (data: IArg) => {
      return callback && callback(data);
    },
    {
      onSuccess: (data: IReturn) => {
        queryClient.invalidateQueries(key);
        onSuccess && onSuccess(data);
      },

      onError: (err: TError) => onError && onError(err),
      onSettled: () => onSettled && onSettled(),
    }
  );
}
