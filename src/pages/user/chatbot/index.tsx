import ConfirmationModal from "@/components/account/deleteConfirmationModal";
import Button from "@/components/button/button";
import MigrateOption from "@/components/chatbot/migratedisplay";
import ChatBotTableActionComponent from "@/components/chatbot/tableAction";
import EmptyState from "@/components/common/empty/empty";
import PageHeading from "@/components/common/text/pageHeading";
import DataUpgrade from "@/components/stateupgrade/upgrade";
import Table from "@/components/table";
import { UserRoutes } from "@/core/const/routes.const";
import { getChatBotTypeText } from "@/core/services/chatbot";
import UserLayout from "@/layout/user";
import { useDeleteChatBot } from "@/providers/hooks/mutate/chatbot";
import { useGetChatBot } from "@/providers/hooks/query/chatbot";
import { useLimitsStore } from "@/providers/stores/statisticsStore";
import { IChatBot } from "@/typings/interface/chatbot";
import { ConfirmationProp } from "@/typings/interface/component/modal/confirmation";
import { TableHeader } from "@/typings/interface/component/table";
import { useRouter } from "next/router";
import { useState } from "react";

interface IModalItems {
  delete: boolean;
  migrate: boolean;
}

let confirmationProp: ConfirmationProp = { onConfirm: () => { } };

export default function ChatbotPage() {
  const stats = useLimitsStore((state) => state.limit);
  const [currentChatbot, setCurrentChatbot] = useState<IChatBot>();
  const [modal, setModal] = useState<IModalItems>({ delete: false, migrate: false });
  const { data } = useGetChatBot();

  const { mutate: deleteChatbot } = useDeleteChatBot({
    options: {
      successConfig: { title: `Chatbot Deleted`, text: `The chatbot has been successfully deleted` },
      errorConfig: { title: "Failed to delete chatbot" },
    },
  });

  const openModal = (key: keyof IModalItems) => {
    setModal((val) => ({ ...val, [key]: true }));
  };

  const closeModal = (key: keyof IModalItems) => {
    currentChatbot && setCurrentChatbot(undefined);
    setModal((val) => ({ ...val, [key]: false }));
  };
  const handleMigrate = (item: IChatBot) => {
    openModal("migrate")

  }
  const handleDelete = (item: IChatBot) => {
    confirmationProp = {
      title: "Delete Chatbot",
      message: " Are you certain you want to delete this chatbot?",
      confirmText: "Delete Chatbot",
      onConfirm: () => {
        closeModal("delete");
        deleteChatbot(item.id ?? "");
      },
    };
    openModal("delete");
  };

  const actionLookup = {
    ["migrate"]: (item: IChatBot) => handleMigrate(item),
    ["delete"]: (item: IChatBot) => handleDelete(item),
  };

  const handleAction = (action: string, item: IChatBot) => {
    setCurrentChatbot({ ...item });
    actionLookup[action as keyof typeof actionLookup](item);
  };

  const router = useRouter();
  const handleRedirect = (url: string = `create`) => {
    router.push(`${UserRoutes.CHAT_BOT}/${url}`);
  };

  const headers: TableHeader<IChatBot>[] = [
    {
      field: "accountId",
      title: "Whatsapp Number",
      component: (props) => <p>{props.item?.account.phoneNumber}</p>,
    },
    {
      field: "type",
      title: "Chat Bot on Account",
      component: (props) => <p>{getChatBotTypeText(props.item!)} Chatbot</p>,
    },

    {
      field: "actions",
      title: "Actions",
      action: { component: ChatBotTableActionComponent, props: { clickHandler: handleAction } },
    },
    {
      field: "view",
      title: "",
      component: (props) => (
        <Button onClick={() => handleRedirect(`edit/${props.item?.id}`)} primary>
          View Chatbot
        </Button>
      ),
    },
  ];

  return (
    <div>
      <PageHeading
        title={"Chatbot"}
        description={"Add and manage your chatbots here"}
        buttonTitle={"Add Chatbot"}
        onClick={() => handleRedirect()}
      />
      <DataUpgrade
        heading={`Chat Bot Usage (${stats?.total_chatbots ?? 0}/${stats?.chatbots ?? 0})`}
        description={`Your current plan limits you to ${stats?.chatbots} chatbot, upgrade to access more chatbots.`}
      />
      <div className="mt-5">
        {data && data.length > 0 ? (
          <Table headers={headers} data={data} />
        ) : (
          <EmptyState
            title="No Chatbot Added"
            text="Click “add chatbot” button to get started in adding your first chatbot"
          />
        )}
      </div>
      <ConfirmationModal isOpen={modal.delete} onClose={() => closeModal("delete")} {...confirmationProp} />
      <MigrateOption isOpen={modal.migrate} onClose={() => closeModal("migrate")} chatbot={currentChatbot} />
    </div>
  );
}
ChatbotPage.Layout = UserLayout;
