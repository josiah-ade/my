import { ModalProps } from "@/typings/interface/component/modal";
import Modal from "../modal/modal";
import Button from "../button/button";

interface IProps extends ModalProps {
  onConfirm: () => void;
  confirmText?: string;
  title?: string;
  message?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  title = "Confirmation",
  message = "Are you sure you want to proceed?",
}: IProps) {
  const handleClick = () => {
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white whitespace-break-spaces">
        <h2 className="text-2xl font-semibold mb-4"> {title} </h2>
        <p className="text-gray-600 mb-6"> {message} </p>
        <Button onClick={handleClick} error className="w-full">
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
