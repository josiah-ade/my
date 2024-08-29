import { useState } from "react";
import Button from "@/components/button/button";
import UserLayout from "@/layout/user";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import Image from "next/image";
import { Plus } from "@/core/const/icons/icons";
import { TableHeader } from "@/typings/interface/component/table";
import Link from "next/link";
import Table from "@/components/table";
import { IFormList } from "@/typings/interface/form";
import EmptyState from "@/components/common/empty/empty";
import { useGetForm } from "@/providers/hooks/query/getform";
import { useRouter } from "next/router";
import { UserRoutes } from "@/core/const/routes.const";
import FormTableActionComponent from "@/components/form/tableAction";
import { FormActionComp } from "@/components/form/inlineAction";
import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import { useDeleteForm } from "@/providers/hooks/mutate/createForm";
import { NotificationType } from "@/core/enum/notification";
import { FormTableAction } from "@/core/enum/form";
import useNotificationStore from "@/providers/stores/notificationStore";
import { getFormLink } from "@/core/services/form";
import { NotificationData } from "@/typings/interface/component/notification";

interface ModalItems {
  confirmation: boolean;
  edit: boolean;
  formCode: boolean;
  rawCode: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => {} };

export default function UserForm() {
  const router = useRouter();

  const { data: formList } = useGetForm({ loadingConfig: { displayLoader: true } });

  const handleCreateForm = () => {
    router.push(UserRoutes.FORM_CREATE);
  };

  const setNotification = useNotificationStore((state) => state.displayNotification);
  const [modal, setModal] = useState<ModalItems>({
    confirmation: false,
    edit: false,
    formCode: false,
    rawCode: false,
  });

  const handleOpenModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };

  const handleCloseModal = (key: keyof ModalItems) => {
    setModal((val) => ({ ...val, [key]: false }));
  };

  const actionLookUp = {
    [FormTableAction.delete]: (item: IFormList) => handleDelete(item),
    [FormTableAction.archiveForm]: (item: IFormList) => handleDelete(item),
    [FormTableAction.copyFormIframeCode]: (item: IFormList) => handleDelete(item),
    [FormTableAction.copyRawHtmlCode]: (item: IFormList) => handleDelete(item),
    [FormTableAction.copyFormLink]: (item: IFormList) => handleCopyLink(item),
  };

  const { mutate: deleteForm } = useDeleteForm({
    onSuccess: () => handleSuccess("Account deleted successfully", "Your account was deleted successfully"),
    options: { errorConfig: { title: "Failed to delete account" } },
  });

  const openConfirmationModal = (title: string, message: string, confirmText: string, onConfirm: () => void) => {
    confirmationProp = { title, message, confirmText, onConfirm };
    handleOpenModal("confirmation");
  };

  const handleDelete = (item: IFormList) => {
    openConfirmationModal("Delete Form", "Are you sure you want to delete this form?", "Delete form", () =>
      deleteForm(item.id ?? "")
    );
  };

  const handleCopyLink = async (item: IFormList) => {
    const formLink = getFormLink(item);
    const data: NotificationData = {
      type: NotificationType.success,
      content: { title: "Success", text: ` "Copied ${formLink} to clipboard` },
    };

    try {
      await navigator.clipboard.writeText(formLink);
    } catch (e) {
      data.type = NotificationType.error;
      data.content = { title: "Oops", text: `Failed to copy!` };
    }
    setNotification(data);
  };

  const handleSuccess = (title: string, text: string) => {
    setNotification({
      type: NotificationType.success,
      content: { title, text },
    });
    handleCloseModal("confirmation");
  };

  const handleAction = (action: string, item: IFormList) => {
    actionLookUp[action as keyof typeof FormTableAction](item);
  };

  const headers: TableHeader<IFormList>[] = [
    { field: "name", title: "Form Name", icon: "/chevron.jpg" },
    { field: "entries", title: "Entries", icon: "/chevron.jpg" },
    { field: "hits", title: "Hits", icon: "/chevron.jpg" },
    {
      field: "formLink",
      title: "Form Link",
      action: { component: (props) => <span> {getFormLink(props.item!)} </span> },
    },
    {
      field: "view",
      title: "Action",
      action: { component: FormActionComp, props: { clickHandler: handleAction } },
    },
    {
      field: "action",
      title: "",
      action: {
        component: (props) => (
          <Link href={`${UserRoutes.FORM_ENTRIES}/${props.item?.id ?? ""}`}>
            <Button primary {...props}>
              View Entries
            </Button>
          </Link>
        ),
      },
    },
    {
      field: "action",
      title: "",
      action: { component: FormTableActionComponent, props: { clickHandler: handleAction } },
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-between items-center mb-4">
          <section>
            <h2 className="text-xl font-semibold text-[1.3rem]">Forms</h2>
            <p className="text[0.9rem]">Create and manage your forms here</p>
          </section>
          <section className="flex items-center space-x-2">
            <Button
              primary
              className=" text-white px-4 py-2 rounded-lg"
              icon={<Plus />}
              onClick={() => handleCreateForm()}
            >
              Create Form
            </Button>
          </section>
        </div>
        <section className="border border-gray-200">
          <div className="border-l-8 border-warning-500  rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full mr-4">
                <Image src="/warning.jpg" alt="waring" width={30} height={30} />
              </div>
              <div>
                <h3 className="font-medium">Forms Usage (0/1)</h3>
                <p className="text-gray-500">Your current plan limits you to 1 form, upgrade to create more forms</p>
              </div>
            </div>
            <button className=" bg-primary text-white px-4 py-2 rounded-lg">Upgrade</button>
          </div>
        </section>
      </div>

      {formList && formList.length > 0 ? <Table headers={headers} data={formList} /> : <EmptyState />}

      <ConfirmationModal
        isOpen={modal.confirmation}
        onClose={() => handleCloseModal("confirmation")}
        {...confirmationProp}
      />
    </>
  );
}

UserForm.Layout = UserLayout;
