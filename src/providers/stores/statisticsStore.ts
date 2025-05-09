import { ILimitData, Limit } from "@/typings/interface/component/layout/menu";
import { create } from "zustand";

interface ILimitStore {
  limit: ILimitData | any;
  setLimitStore: (data: ILimitData) => void;
}
export const useLimitsStore = create<ILimitStore>((set) => ({
  limit:undefined,
  setLimitStore: (data) => {
    set(() => ({
      limit: data,
    }));
  },
}));
