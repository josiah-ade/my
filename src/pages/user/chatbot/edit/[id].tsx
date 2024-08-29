import UserLayout from "@/layout/user";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateChatBot from "../create";
import { useGetChatBotDetails } from "@/providers/hooks/query/chatbot";
import { ICreateChatBot } from "@/typings/interface/chatbot";

export default function EditChatBot() {
  const { id } = useParams() ?? {};

  const { data: details } = useGetChatBotDetails(id as string, { enabled: !!id });
  const [formData, setFormData] = useState<ICreateChatBot | undefined>();

  useEffect(() => {
    if (!details) return;
    setFormData({
      id: details.id,
      accountId: details.account.id,
      type: details.type,
      status: details.status,
      broadcastId: details.broadcast.id,
      messages: details.messages.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((item) => ({ ...item })),
      triggerWord: details.triggerWord,
      matchPercentage: details.matchPercentage,
      matchType: details.matchType,
    });
  }, [details]);

  return <div>{details && <CreateChatBot defaultData={formData} />}</div>;
}

EditChatBot.Layout = UserLayout;
