
import PreviewForm from "@/components/form/previewForm";

import { useGetCreateForm } from "@/providers/hooks/query/getform";
import {  IFormList } from "@/typings/interface/form";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ViewForm() {
  const [getFormById, setGetFormById] = useState<IFormList>();  
  const [formSubmission, setFormSubmission] = useState<string>("form");

  const { id } = useParams() ?? {};
  const formId = id as string | undefined;

  const { data: viewFormData } = useGetCreateForm(formId ?? "");

  useEffect(() => {
    if (!viewFormData) return;
    const { formFields, ...formData } = viewFormData;
    const state: IFormList = { ...formData, fields: formFields ?? [] };
    setGetFormById(state);
  }, [id, viewFormData]);

  const closeModalOnSuccess = () => {
    setFormSubmission("submit");
  };

  return (
    <div className="flex bg-primary-50 h-screen  justify-center p-5 md:p-10 items-center">
      {getFormById ? (
        <div className="w-full flex justify-center items-center">
          {formSubmission === "form" ? (
            <div className="max-w-xl w-full">

              <PreviewForm isSubmission={false} questions={getFormById} closeModalOnSuccess={closeModalOnSuccess} />
            </div>
          ) : (
            <section className="flex flex-col items-center justify-center">
              <h2 className="text-gray-800 text-xl">Response Received</h2>
              <p className="mt-2 text-sm text-gray-600">{getFormById.confirmationMessage ?? ""}</p>

              <p className="mt-4 text-md text-gray-600">{getFormById.footerDisclaimer ?? ""}</p>
            </section>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-sm text-warning-700">Form Does not exist, please check the id and try again</p>
        </div>
      )}
    </div>
  );
}
