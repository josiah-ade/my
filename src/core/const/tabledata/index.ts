import { TableHeader } from "@/core/types/interfaces/components/table";
import { IUserTableData } from "@/core/types/interfaces/users";

export const headers: TableHeader<IUserTableData>[] = [
    { field: "customerName", title: "Customer Name" },
    { field: "businessName", title: "Business Name" },
    { field: "email", title: "Email" },
    { field: "plans", title: "Plans",type: "chip", default: "Free Plan" },
    { field: "connectedAccount", title: "Connected Account" },
    { field: "lastLogin", title: "Last Login" },
    { field: "action", title: "",
        // action: { component: AccountTableActionComponent },
     },
]
export const data: IUserTableData[] = [
    {
        customerName: "David EkomObong", businessName: "Ekom Inc", email: "ekondavidobong@gmail.com",
         plans: "free",
        connectedAccount: "1/1",
        lastLogin: "12/jan/2024 at 12:34pm"
    },
    {
        customerName: "David EkomObong", businessName: "Ekon Inc", email: "ekondavidobong@gmail.com",
         plans: "free",
        connectedAccount: "1/1",
        lastLogin: "12/jan/2024 at 12:34pm"
    },
    {
        customerName: "David EkomObong", businessName: "Ekon Inc", email: "ekondavidobong@gmail.com",
         plans: "free",
        connectedAccount: "1/1",
        lastLogin: "12/jan/2024 at 12:34pm"
    },
    {
        customerName: "David EkomObong", businessName: "Ekon Inc", email: "ekondavidobong@gmail.com",
         plans: "free",
        connectedAccount: "1/1",
        lastLogin: "12/jan/2024 at 12:34pm"
    },
]