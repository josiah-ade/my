import { TableHeader } from "@/core/types/interfaces/components/table";
import { IUserBroadCastTableData, IUserTableData } from "@/core/types/interfaces/users";

export const broadcastheaders: TableHeader<IUserBroadCastTableData>[] = [
    { field: "account", title: "Account " },
    { field: "listName", title: "List Name" },
    { field: "numbersList", title: "Numbers in List",},
    { field: "messageLimit", title: "Daily Message Limit" },
    { field: "totalMessageSent", title: "Total messages sent" },
    { field: "lastMessageSent", title: "Last Message Sent" },
    { field: "action", title: "",
        // action: { component: AccountTableActionComponent },
     },
]
export const broadcastdata: IUserBroadCastTableData[] = [
    {
        account: "David EkomObong",
        listName: "free",
        numbersList: "1/1",
        messageLimit: "12/jan/2024 at 12:34pm",
        totalMessageSent: "1,234",
        lastMessageSent: "12/jan/2024 at 12:34pm",
    },
    
    {
        account: "David EkomObong",
        listName: "free",
        numbersList: "1/1",
        messageLimit: "12/jan/2024 at 12:34pm",
        totalMessageSent: "1,234",
        lastMessageSent: "12/jan/2024 at 12:34pm",
    },
    
    {
        account: "David EkomObong",
        listName: "free",
        numbersList: "1/1",
        messageLimit: "12/jan/2024 at 12:34pm",
        totalMessageSent: "1,234",
        lastMessageSent: "12/jan/2024 at 12:34pm",
    },
    
]