import UserLayout from "@/layout/user";
import { useGetGroupAutomationDetails } from "@/providers/hooks/query/automation/group";
import { ICreateGroupAutomation } from "@/typings/interface/automation/group";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateGroupAutomation from "../create";
import moment from "moment";

export default function EditGroupAutomation() {
  const { id } = useParams() ?? {};

  const { data: details } = useGetGroupAutomationDetails(id as string, { enabled: !!id });
  const [formData, setFormData] = useState<ICreateGroupAutomation | undefined>();

  useEffect(() => {
    if (!details) return;
    setFormData({
      id: details.id,
      accountId: details.account.id,
      type: details.type,
      status: details.status,
      messages: details.messages
        .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
        .map((item) => ({
          ...item,
          startDate: item.startDate ? moment(item.startDate ?? "").format("YYYY-MM-DD") : "",
          endDate: item.endDate ? moment(item.endDate ?? "").format("YYYY-MM-DD") : "",
        })),
      groups: details.groups.map((group) => group.id),
      triggerWord: details.triggerWord,
      matchPercentage: details.matchPercentage,
      matchType: details.matchType,
    });
  }, [details]);

  return <div>{details && <CreateGroupAutomation defaultData={formData} />}</div>;
}

EditGroupAutomation.Layout = UserLayout;
