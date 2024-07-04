import { BroadCastList } from "@/core/types/data.interface";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  broadcastDetail?: BroadCastList;
}
