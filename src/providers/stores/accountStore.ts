import { IAccount } from "@/typings/interface/account";
import { create } from "zustand";

interface AccountStore {
  accounts: IAccount[];
  connectedAccounts: IAccount[];
  setAccount: (data: IAccount[]) => void;
}

export const useAccountStore = create<AccountStore>((set, get) => ({
  accounts: [],
  connectedAccounts: [],
  setAccount: (data) => {
    set(() => ({
      accounts: data,
      connectedAccounts: data.filter((item) => item.status == "connected"),
    }));
  },
}));
