import { IAccount } from "@/typings/interface/account";
import { create } from "zustand";

interface AccountStore {
  accounts: IAccount[];
  setAccount: (data: IAccount[]) => void;
}

export const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  setAccount: (data) => {
    set(() => ({
      accounts: data,
    }));
  },
}));
