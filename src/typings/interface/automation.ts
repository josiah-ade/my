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
export interface IAutomation extends IAutomationContact{
    id: string;
    status:string;
}


export interface ICreateAutomationList {
    accountId: string;
    broadCastListId: "list" | "group"| "";
    type: "immediately" | "sameday" | "all" | "";
    typeValue?: number;
    time?: string;
    timeZone?: string;
    status: "active" | "inactive"  | ""; 
    tagCondition?: string;
    tags?: string[];
    files?: Record<string, any>[]; 
  }
  