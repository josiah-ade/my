import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { Bin, Pencil } from "@/core/const/icons/icons";
import { NotificationType } from "@/core/enum/notification";
import { useDeleteBroadcastTemplateList } from "@/providers/hooks/mutate/templates";
import useNotificationStore from "@/providers/stores/notificationStore";
import { ModalItems, ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import { ITemplate } from "@/typings/interface/templates";
import { useState } from "react";

interface IProps{
    item:ITemplate,
    setSingleUserData:(data: any)=>void
}
export default function TemplateAction(props:IProps) {
    const{item, setSingleUserData}=props
    const [modal, setModal] = useState<ModalItems>({ edit: false, confirmation: false, history: false });
    const [confirmationProp, setConfirmationProp] = useState<ConfirmationProp>({ onConfirm: () => { } });
    const setNotification = useNotificationStore((state) => state.displayNotification);
    const { mutate: deleteTemplate } = useDeleteBroadcastTemplateList({
        onSuccess: () => handleSuccess("Template deleted", "Your template has been successfully deleted."),
        options: { errorConfig: { title: "Failed to delete template" } },
    });
    const handleSuccess = (title: string, text: string) => {
        setNotification({
            type: NotificationType.success,
            content: { title, text },
        });
        handleCloseModal("confirmation");
    };

    const handleCloseModal = (key: keyof ModalItems) => {
        setModal((val) => ({ ...val, [key]: false }));
    };

    const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
        setConfirmationProp({ title, message, confirmText, onConfirm });
        setModal((val) => ({ ...val, confirmation: true }));
    };
    const handleDelete = (item: ITemplate, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        openConfirmationModal(
            "Delete Template",
            "Are you certain you want to delete this template?",
            "Delete Template",
            () => {
                deleteTemplate(item.id);
                handleCloseModal("confirmation");
            }
        );
    };

    const handleEdit = (item: ITemplate, ) => {
        setSingleUserData(item)
    };

    return (
        <div>
            <div className="flex flex-row gap-3 px-6">
                <button onClick={() => handleEdit(item)} style={{ cursor: "pointer" }}>
                    <Pencil className="text-gray-400" />
                </button>
                <button onClick={(e) => handleDelete(item, e)} style={{ cursor: "pointer" }}>
                    <Bin className="text-gray-400" />
                </button>
            </div>
            <ConfirmationModal
                isOpen={modal.confirmation}
                onClose={() => handleCloseModal("confirmation")}
                {...confirmationProp}
            />
        </div>
    )
}