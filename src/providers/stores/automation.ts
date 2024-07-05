import { IAutomation, IAutomationContact } from "@/typings/interface/automation";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { create } from "zustand";

interface AutomationStore {
  automation: IAutomation[];
  setAutomation: (data: IAutomationContact[]) => void;
}
export const useAutomationStore = create<AutomationStore>((set) => ({
  automation: [],
  setAutomation: (data) => {
    set(() => ({
      automation: data,
    }));
  },
}));
