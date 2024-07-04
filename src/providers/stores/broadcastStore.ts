import { IAutomationContact } from "@/typings/interface/automation";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { create } from "zustand";

interface BroadcastStore {
  broadcasts: IBroadcastLists[];
  setBroadcast: (data: IBroadcastLists[]) => void;
}

export const useBroadcastStore = create<BroadcastStore>((set) => ({
  broadcasts: [],
  setBroadcast: (data) => {
    set(() => ({
      broadcasts: data,
    }));
  },
}));

