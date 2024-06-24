export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface ConfirmationProp {
  onConfirm: () => void;
  confirmText?: string;
  title?: string;
  message?: string;
}