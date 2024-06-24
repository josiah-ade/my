import { NotificationType } from '@/core/enum/notification';
import { IPlaceholderContent } from '../../store/loading';

export interface NotificationData {
  delay?: number;
  type?: NotificationType;
  content?: IPlaceholderContent;
}
