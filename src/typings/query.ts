export interface IAPIFilter {
    // page?: number;
    [index: string]: string | number | undefined;
  }
  
  export interface IMutationArgs<IArg, IReturn, TError = Error> {
    key: [string, IAPIFilter?];
    callback: (arg: IArg) =>Promise<IReturn>;
    onSuccess?: (data?: IReturn) =>void;
    onError?: (error: TError) =>void;
    onSettled?: () => void;
  }
  
  export interface IQueryArgs<IArg, IReturn> {
    key: [string, IAPIFilter?];
    callback: (arg?: unknown) => Promise<IReturn>;
  }
  
  export interface IPaginatedQueryArgs<IReturn> {
    key: [string, IAPIFilter?];
    callback: (arg: unknown) => Promise<IPaginatedReturns<IReturn>>;
  }
  
  export interface IMutationResponse<IArg = unknown, IReturn = unknown> {
    mutate: unknown;
    status: string;
  }
  export interface IQueryResponse<IReturn = unknown> {
    data?: IReturn;
    status: string;
  }
  export interface IQueryOptions {
    enabled: boolean;
  }
  
  export interface IPaginatedReturns<IReturn> {
    count(count: any): number;
    data: IReturn;
    pagination: {
      limit: number;
      page: number;
      count: number;
    };
  }
  
  export interface IMutationHook<IReturn = unknown, TError = Error> {
    onSuccess?: (data?: IReturn) => void;
    onError?: (error: TError) => void;
    onSettled?: () => void;
  }
  