export interface ISubScription {
  date?: string;
  package?: string;
  duration?: string;
  expiry?: string;
  price?: string;
  status?: string;
}
export interface IPlanDetails {
  label?: string;
  field: string;
  prefix?: string;
  direction?: "l" | "r";
}
export interface ISubscriptionPackage {
  id: string;
  name: string;
  amount: number;
  whatsappAccounts: number;
  contactsMessageSendLimit: number;
  contactsImport: number;
  contactsAutoSaveDaily: number;
  broadcastListLimit: number;
  formLimit: number;
  chatBots: number;
  automationMessages: number;
  mediaSupport: string;
  emojiSupport: boolean;
  groupBroadcast: boolean;
  listBroadcast: boolean;
  whatsappSupport: string;
  deliveryReport: string;
  technicalSupport: string;
  referralCommission: string;
  subscriptionCount: number;
  renewalPrice: string;
}

export interface IInitiatePayment {
  planId: string;
  accountId: string;
  callbackUrl: string;
}

export interface IVerifyPayment {
  reference: string;
}

export interface IPaymentResponse {
  authorizationUrl: string;
}

export interface SubscriptionHistory{
  package: string;
  interval: string;
  currency: string;
  amount: number;
  price: number;
  status: string;
  duration: string;
  paid_at: string;    
  expiredAt: string;
  createdAt: string;
}



