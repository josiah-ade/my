import { Limit } from "../types/interfaces/components/menu.interface";

export const dashboardItems: Limit[] = [
  {
    title: 'Plan',
    field: "plan",
    totalField: "total_plan"
  },
  {
    title: 'Accounts',
    field: "accounts",
    totalField: "total_accounts"
  },
  {
    title: 'Broadcast Lists',
    field: "broadcastLists",
    totalField: "total_broadcastLists"
  },
  {
    title: 'Form Usage',
    field: "forms",
    totalField: "total_forms"
  },
  {
    title: 'Chatbots',
    field: "chatbots",
    totalField: "total_chatbots"
  },
  {
    title: 'Automations',
    field: "automations",
    totalField: "total_automations"
  },
];