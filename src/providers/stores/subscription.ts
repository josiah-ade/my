import { ISubscriptionPackage } from "@/typings/interface/subscription";
import { create } from "zustand";

interface SubscriptionStore {
  subscription: ISubscriptionPackage[];
  setSubscription: (data: ISubscriptionPackage[]) => void;
}
export const useSubcriptionStore = create<SubscriptionStore>((set) => ({
    subscription: [],
    setSubscription: (data) => {
    set(() => ({
    subscription: data,
    }));
  },
}));
