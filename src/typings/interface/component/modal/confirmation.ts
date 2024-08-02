export interface ConfirmationProp {
  onConfirm: () => void;
  confirmText?: string;
  title?: string;
  message?: string;
}
export interface ModalItems {
  confirmation: boolean;
  edit: boolean;
  history: boolean;
}
