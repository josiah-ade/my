import { IPlanDetails } from "@/typings/interface/subscription";

export const planDetails: IPlanDetails[] = [
    { field: 'amount', prefix: 'NGN ' },
    { field: 'whatsappAccounts', label: 'WhatsApp Accounts' },
    { field: 'contactsMessageSendLimit', label: 'Contacts To Receive WhatsApp Messages' },
    { field: 'contactsImport', label: 'Contacts Import' },
    // { field: 'contactsAutoSaveDaily', label: 'Contacts Save' },
    { field: 'broadcastListLimit', label: 'Broadcast List Limit' },
    { field: 'formLimit', label: 'Form Limit' },
    { field: 'chatBots', label: 'ChatBots' },
    { field: 'automationMessages', label: 'Automation Messages' },
    { field: 'mediaSupport', label: 'Media Support', direction: 'l' },
    { field: 'emojiSupport', label: 'Emoji Support' },
    { field: 'groupBroadcast', label: 'Broadcast Messages To Groups' },
    { field: 'listBroadcast', label: 'Broadcast Messages To Lists' },
    { field: 'whatsappSupport', label: '' },
    // { field: 'deliveryReport', label: '' },
    // { field: 'technicalSupport', label: '' },
    // { field: 'referralCommission', label: '' },
];
