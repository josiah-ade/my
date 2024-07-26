import { dateFormatter } from "@/core/formatters/dateFormatter";
import { IAccount } from "@/typings/interface/account";
import { TableHeader } from "@/typings/interface/component/table";
import AccountTableActionComponent from "@/components/account/tableAction";
import { AccountTableAction } from "@/core/enum/account";
import { Data } from "@/core/types/data.interface";
import { Bin, Circle, Message, Hash, Repeat, Qr, Home, Plus, Link } from "@/core/const/icons/icons";

interface TableActionProp extends Data {
  status?: string;
  action: string;
  className?: string;
}

export const AccountTableHeaders: TableHeader<IAccount>[] = [
  { field: "phoneNumber", title: "WhatsApp Number" },
  { field: "description", title: "Purpose" },
  { field: "plan", title: "Plan", default: "Free Plan" },
  {
    field: "activeTill",
    title: "Expiry",
    formatter: (val) => {
      const date = new Date(parseInt(val));
      return date.getTime() ? dateFormatter(date.toDateString()) : val;
    },
  },
  { field: "status", title: "Service Status", type: "chip" },
  {
    field: "action",
    title: "",
    action: { component: AccountTableActionComponent },
  },
];

export const accountTableMenus: TableActionProp[] = [
  {
    text: "Link with pairing code",
    icon: <Link className="h-4 w-4" />,
    action: AccountTableAction.link,
    status: "active",
  },
  { text: "Link with QR code", icon: <Qr className="h-4 w-4" />, action: AccountTableAction.qrCode, status: "active" },
  {
    text: "Disconnect",
    icon: <Circle className="h-4 w-4" />,
    action: AccountTableAction.disconnect,
    status: "connected",
  },
  {
    text: "Send test message",
    icon: <Message className="h-4 w-4" />,
    status: "connected",
    action: AccountTableAction.sendMessage,
  },
  {
    text: "Unsubscribe Keyword",
    icon: <Hash className="h-4 w-4" />,
    // status: "connected",
    action: AccountTableAction.unsubscribeKeyword,
  },
  {
    text: "Trigger Word To Move To Another List",
    icon: <Hash className="h-4 w-4" />,
    // status: "connected",
    action: AccountTableAction.unsubscribeKeyword,
  },
  {
    text: "Transfer License",
    icon: <Repeat className="h-4 w-4" />,
    status: "connected",
    action: AccountTableAction.transferLicense,
  },
  {
    text: "Delete",
    className: "text-red-600",
    icon: <Bin className="h-4 w-4 text-red-600" />,
    action: AccountTableAction.delete,
  },
];
