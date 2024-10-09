import { TableHeader } from "@/core/types/interfaces/components/table";
import { IPaymentTableData } from "@/core/types/interfaces/payments";

export const headers: TableHeader<IPaymentTableData>[] = [
  { field: "paymentId", title: "Payment ID" },
  { field: "description", title: "Description" },
  { field: "initiatedBy", title: "Initiated by" },
  { field: "date", title: "Date" },
  { field: "amount", title: "Amount" },
  {
    field: "action",
    title: "",
    // action: { component: AccountTableActionComponent },
  },
];
export const data: IPaymentTableData[] = [
  {
    paymentId: "FL-123432",
    description: "2 months subscription",
    initiatedBy: "David Ekomobong",
    date: "12/Jan/2024 at 12:34pm",
    amount: "NGN 30,000.00",
  },
  {
    paymentId: "FL-123432",
    description: "2 months subscription",
    initiatedBy: "David Ekomobong",
    date: "12/Jan/2024 at 12:34pm",
    amount: "NGN 30,000.00",
  },
  {
    paymentId: "FL-123432",
    description: "2 months subscription",
    initiatedBy: "David Ekomobong",
    date: "12/Jan/2024 at 12:34pm",
    amount: "NGN 30,000.00",
  },
  {
    paymentId: "FL-123432",
    description: "2 months subscription",
    initiatedBy: "David Ekomobong",
    date: "12/Jan/2024 at 12:34pm",
    amount: "NGN 30,000.00",
  },
  {
    paymentId: "FL-123432",
    description: "2 months subscription",
    initiatedBy: "David Ekomobong",
    date: "12/Jan/2024 at 12:34pm",
    amount: "NGN 30,000.00",
  },
];
