import { NotificationType } from "../../enum/notification.enum";
import { IPlaceholderContent } from "../generic/content";


export interface NotificationData {
  delay?: number;
  type?: NotificationType;
  content?: IPlaceholderContent;
}
