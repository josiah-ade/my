import { NotificationType } from "@/core/types/enum/notification.enum";
import { ErrorConfig, LoadingConfig } from "@/core/types/interfaces/components/loader.interface";
import useLoadingStore from "@/stores/loadingStore";
import useNotificationStore from "@/stores/notificationStore";
import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  if (ref.current !== value) {
    ref.current = value;
  }
  return ref.current;
};

export const useManageLoadingState = (isLoading: boolean, loadingConfig: LoadingConfig) => {
  const { setLoading, isLoading: stateLoader } = useLoadingStore((state) => state);
  const prevLoading = usePrevious(isLoading);

  useEffect(() => {
    if (isLoading != stateLoader && loadingConfig.displayLoader) {
      setLoading(isLoading, loadingConfig);
    }
  }, [prevLoading]);
};

export const useManageErrorNotifications = (error: Error, errorConfig: ErrorConfig) => {
  const setNotification = useNotificationStore((state) => state.setDisplay);

  if (error && errorConfig.displayError) {
    setNotification(true, {
      type: NotificationType.error,
      content: {
        title: errorConfig.title ?? "Error",
        text: errorConfig.text ?? (error as Error).message,
      },
    });
  }
};
