import {
    IQueryArgs,
    IQueryOptions,
    IPaginatedReturns,
    IPaginatedQueryArgs,
  } from "../../../typings/query";
  import { useQuery } from "react-query";
  
  export function useGetResourcesQuery<IArg, IReturn>(
    { callback, key }: IQueryArgs<IArg, IReturn>,
    options?: IQueryOptions
  ) {
    const { status, data, isLoading, isFetching, error,  } = useQuery(
      key,
      (arg) => {
        return callback && callback(arg);
      },
      options
    );
    return { data, status, loading: isLoading, error, isFetching, };
  }
  
  export function usePaginationQuery<IReturn>(
    { callback, key }: IPaginatedQueryArgs<IReturn>,
    options?: IQueryOptions
  ) {
    const { status, data, isLoading, isFetching, error } = useQuery(
      key,
      (arg) => {
        return callback && callback(arg);
      },
      options
    );
  
    let totalPages = 0;
    let currentPage = 1;
    let totalItems = 0;
    let pageSize = 0;
  
    if (data?.pagination) {
      const { count, limit, page } = data.pagination;
      totalItems = count;
      currentPage = page;
      pageSize = limit;
      totalPages = Math.ceil(count / limit);
    }
  
    return {
      data: data?.data,
      status,
      loading: isLoading,
      error,
      isFetching,
      totalPages,
      totalItems,
      currentPage,
      pageSize,
    };
  }
  