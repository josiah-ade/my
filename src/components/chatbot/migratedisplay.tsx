import { ModalProps } from "@/typings/interface/component/modal";
import Button from "../button/button";
import Select from "../input/selectInput";
import Modal from "../modal/modal";
import { useAccountStore } from "@/providers/stores/accountStore";
import { useMigrateChatBot } from "@/providers/hooks/mutate/chatbot";
import { ChatbotMigrate, IChatBot, ICreateChatBot } from "@/typings/interface/chatbot";
import { useEffect, useState } from "react";

interface IProps extends ModalProps {
  chatbot?: IChatBot;
}

export default function MigrateOption({ chatbot, onClose, isOpen }: IProps) {
  const [formData, setFormData] = useState<ICreateChatBot>();
  const accounts = useAccountStore((state) => state.connectedAccounts);
  const { mutate: updateChatBot } = useMigrateChatBot({
    onSuccess: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (!chatbot) return;
    setFormData({
      id: chatbot?.id,
      accountId: chatbot?.account?.id,
      type: chatbot?.type,
      status: chatbot?.status,
      broadcastId: chatbot?.broadcast?.id,
      messages: (chatbot?.messages || [])
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((item) => ({ ...item })),
      triggerWord: chatbot?.triggerWord,
      matchPercentage: chatbot?.matchPercentage,
      matchType: chatbot?.matchType,
    });
  }, [chatbot]);

  function handleChange(value: string) {
    if (formData) {
      setFormData({ ...formData, accountId: value });
    }
  }

  const handleSubmit = () => {
    if (chatbot && formData) {
      const updatedFormData: ChatbotMigrate = {
        ...formData,
        chatbotId: chatbot.id,
      };

      updateChatBot(updatedFormData);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-xl font-bold">Migrate Chatbot</h2>
        <h4 className="mb-5 mt-[0.63rem]">Move this chatbot to operate on another account</h4>
        <Select
          onChange={handleChange}
          name={"account"}
          label={"Select account"}
          options={accounts}
          controlField={"id"}
          displayField={"phoneNumber"}
          value={formData?.accountId}
        />
        <div className="mt-5">
          <Button onClick={handleSubmit} primary className="w-full">
            Migrate Chat Bot
          </Button>
        </div>
      </div>
    </Modal>
  );
}
