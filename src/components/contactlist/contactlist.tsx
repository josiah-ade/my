import React, { useState } from "react";
import { Bin, Edit } from "@/core/const/icons/icons";
import { IBroadcastContact, IBroadcastLists } from "@/typings/interface/broadcasts";
import { useDeleteBroadcastContact } from "@/providers/hooks/mutate/createcontact";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import ConfirmationModal from "../account/deleteConfirmationModal";
import { EditBroadcastContactModal } from "../broadcast/editContactModal";
import EmptyState from "../common/empty/empty";

interface IProps {
  contacts?: IBroadcastContact[];
  selectedValue: IBroadcastLists;
}

interface ContactlistModalItems {
  delete: boolean;
  edit: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function ContactsList(props: IProps) {
  const { contacts, selectedValue } = props;
  const [selected, setSelected] = useState<IBroadcastContact>();

  const [modal, setModal] = useState<ContactlistModalItems>({
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

  const displayConfirmation = (item: IBroadcastContact) => {
    confirmationProp = {
      title: "Delete Contact",
      message: "Are you sure you want to delete this contact? This action cannot be undone.",
      onConfirm: () => deleteContact(item!),
    };
    handleOpenModal("delete");
  };

  const handleEdit = (item: IBroadcastContact) => {
    setSelected(item);
    handleOpenModal("edit");
  };

  const handleOpenModal = (key: keyof ContactlistModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };

  const handleCloseModal = (key: keyof ContactlistModalItems) => {
    setModal((val) => ({ ...val, [key]: false }));
  };

  return (
    <div className="">
      <div className="">
        <div className="mb-4">
          <span className="text-xs font-semibold mt-4 rounded-full text-white px-2 py-1 bg-secondary">
            Recently Added
          </span>
          <h2 className="text-base font-semibold text-gray-900 mt-2">
            {selectedValue ? selectedValue.listName : "N/A"}
          </h2>
          <p className="text-gray-600 text-sm">{`Recently imported contacts fron ${
            selectedValue ? selectedValue.listName : "N/A"
          } list`}</p>
          <hr className="mt-6 border-1 border-gray-700" />
        </div>
        {contacts && contacts.length ? (
          <ul>
            {contacts.map((contact, index) => (
              <li key={index} className="flex justify-between py-4">
                <div>
                  <p className="font-semibold text-base text-gray-900">{contact.name}</p>
                  <p className="text-sm text-gray-600">
                    {contact.phoneNumber} • {contact.email}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-600" onClick={() => handleEdit(contact)}>
                    <Edit />
                  </button>
                  <button className="text-gray-600" onClick={() => displayConfirmation(contact)}>
                    <Bin />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Empty List" />
        )}

        <ConfirmationModal isOpen={modal.delete} onClose={() => handleCloseModal("delete")} {...confirmationProp} />

        {selected && (
          <EditBroadcastContactModal
            key={selected.id}
            isOpen={modal.edit}
            onClose={() => handleCloseModal("edit")}
            contact={selected}
          />
        )}
      </div>
    </div>
  );
}
