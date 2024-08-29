import React, { useEffect, useState } from "react";
import CreateFormComp from "@/components/form";
import { useGetFormDetails } from "@/providers/hooks/query/getform";
import { useParams } from "next/navigation";
import { ICreateForm } from "@/typings/interface/form";

export default function EditForm() {
  const [getFormById, setGetFormById] = useState<ICreateForm>();
  const { id } = useParams() ?? {};
  const formId = id as string | undefined;
  const { data: formDetails } = useGetFormDetails(formId ?? "", { enabled: !!formId });

  useEffect(() => {
    if (!formDetails) return;
    // The formFields are separated from the rest of formDetails. The remaining properties are spread into formData.
    const { formFields, ...formData } = formDetails;
    const state: ICreateForm = { ...formData, fields: formFields ?? [] };

    // state.fields.map((item, index) => {
    //   if (index === 0) {
    //     item.is = true;
    //   }

    //   if (index === 1) {
    //     item.IsDisabled = true;
    //   }
    // });
    setGetFormById(state);
  }, [formId, formDetails]);

  return <div>{getFormById ? <CreateFormComp formDetails={getFormById} isEdit={true} /> : <>NOTING</>}</div>;
}
