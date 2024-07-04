export interface IAutomation{
    list:string,
    account:string,
    automationType:string,
    time:string,
    daytorun:string,
    status:string,
    timedelivery:string
}
export interface IAutomationContact {
        accountId: string;
        id: string;
        broadCastListId: string;
        type: string;
        time: string;
        timeZone: string;
        status: string;
        tagCondition: string;
}   

export interface ICreateAutomationList {
    accountId: string;
    broadCastListId: "list" | "group"| "";
    type: "immediately" | "sameday" | "all" | "";
    typeValue: number;
    time: string;
    timeZone: string;
    status: "active" | "inactive"  | ""; 
    tagCondition: string;
    tags: string[];
    files: Record<string, any>[]; 
  }
  