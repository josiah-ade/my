export interface IUserTableData{
    customerName:string;
    businessName:string;
    email?:string;
    plans:string;
    connectedAccount:string;
    lastLogin:string;
}

export interface Userdetails{
    customerName:string;
    businessName:string;
    email?:string;
    plans:string;
    connectedAccount:string;
    lastLogin:string;

}

export interface IUserBroadCastTableData{
    account:string;
    listName:string;
    numbersList:string;
    messageLimit:string;
    totalMessageSent:string;
    lastMessageSent:string

}