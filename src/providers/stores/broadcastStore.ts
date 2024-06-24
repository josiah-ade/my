import { IBroadcastList } from "@/typings/interface/broadcasts";
import { create } from "zustand";

interface BroadcastStore {
  broadcasts: IBroadcastList[];
  setBroadcast: (data: IBroadcastList[]) => void;
}

export const useBroadcastStore = create<BroadcastStore>((set) => ({
  broadcasts: [],
  setBroadcast: (data) => {
    set(() => ({
      broadcasts: data,
    }));
  },
}));
