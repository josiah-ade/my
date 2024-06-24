import { create } from "zustand";
import { NotificationData } from "@/typings/interface/component/notification";

interface NotificationState {
  display: boolean;
  data: NotificationData;
  setDisplay: (display: boolean, data?: NotificationData) => void;
  displayNotification: (data: NotificationData) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  display: false,
  data: {},
  setDisplay: (display: boolean, data: NotificationData = {}) => set({ display, data }),
  displayNotification: ({ ...data }: NotificationData = {}) => set({ display: true, data }),
}));

export default useNotificationStore;
