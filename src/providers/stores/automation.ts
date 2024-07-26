import {  IAutomationContact, IListAutomation } from "@/typings/interface/automation";
import { IBroadcastLists } from "@/typings/interface/broadcasts";
import { create } from "zustand";

interface AutomationStore {
  automation: IListAutomation[];
  setAutomation: (data: IListAutomation[]) => void;
}
export const useAutomationStore = create<AutomationStore>((set) => ({
  automation: [],
  setAutomation: (data) => {
    set(() => ({
      automation: data,
    }));
  },
}));
