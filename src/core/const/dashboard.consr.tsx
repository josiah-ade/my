import { Limit } from "@/typings/interface/component/layout/menu";

export const dashboardItems: Limit[] = [
  {
    title: 'Accounts',
    field: "accounts",
    totalField: "total_accounts"
  },
  {
    title: 'Leads',
    field: "leads",
    totalField:"total_leads"
  },
  {
    title: 'Forms',
    field: "forms",
    totalField: "total_forms"
  },
  {
    title: 'Automations',
    field: "automations",
    totalField: "total_automations"
  },
  {
    title: 'Broadcast Lists',
    field: "broadcastLists",
    totalField: "total_broadcastLists"
  },
  {
    title: 'Chatbots',
    field: "chatbots",
    totalField: "total_chatbots"
  },
 
];