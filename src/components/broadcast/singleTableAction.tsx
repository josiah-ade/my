import { BroadCastList } from "@/core/types/data.interface";

import { Bin, Qr, Circle, Plus, Userg, Pencil, Usercancel } from "@/core/const/icons/icons";
import { TableHeaderActionProp } from "@/typings/interface/component/table";
import { useState } from "react";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import ConfirmationModal from "../account/deleteConfirmationModal";
import { useDeleteBroadcastContact } from "@/providers/hooks/mutate/createcontact";
import { IBroadcastContact } from "@/typings/interface/broadcasts";
import { EditBroadcastContactModal } from "./editContactModal";

interface ModalItems {
  delete: boolean;
  edit: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function SingleBroadcastTableAction({ item }: TableHeaderActionProp<IBroadcastContact>) {
  const [modal, setModal] = useState<ModalItems>({
    edit: false,
    delete: false,
  });

  const { mutate: deleteContact } = useDeleteBroadcastContact({
    onSuccess: () => handleCloseModal("delete"),
    options: {
      errorConfig: { title: "Failed to delete contact" },
      successConfig: { title: "Contact Deleted", text: "The contact was successfully deleted." },
    },
  });

  const displayConfirmation = () => {
    confirmationProp = {
      title: "Delete Confirmation",
      message: "Are you sure you want to delete this contact? This action cannot be undone.",
      onConfirm: () => deleteContact(item!),
    };
    handleOpenModal("delete");
  };

  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };
  const handleCloseModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: false }));
  };

  return (
    <div className="flex gap-3">
      <Pencil onClick={() => handleOpenModal("edit")} /> <Bin onClick={displayConfirmation} />
      <ConfirmationModal isOpen={modal.delete} onClose={() => handleCloseModal("delete")} {...confirmationProp} />
      <EditBroadcastContactModal
        key={item?.id}
        isOpen={modal.edit}
        onClose={() => handleCloseModal("edit")}
        contact={item!}
      />
    </div>
  );
}
