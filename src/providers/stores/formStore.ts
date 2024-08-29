import { ICreateFormList, IFormList } from "@/typings/interface/form";
import { create } from "zustand";

interface FormStore {
  formList: IFormList[];
  setFormList: (data: IFormList[]) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formList: [],
  setFormList: (data) => {
    set(() => ({
      formList: data,
    }));
  },
}));
