import React, { useMemo, useState } from "react";
import { IFormList, ISubmitForm } from "@/typings/interface/form";
import Button from "../button/button";
import Image from "next/image";
import { useCreateSubmissionForm } from "@/providers/hooks/mutate/createForm";
import { formatZodErrors } from "@/core/formatters/zodError.formatter";
import { getFormSchema } from "@/core/services/form";

interface IProps {
  questions: IFormList;
  isOpen?: boolean;
  closeModal?: () => void;
  isSubmission: boolean;
  closeModalOnSuccess?: () => void;
  customeStyle?: boolean;
}

export default function PreviewForm(props: IProps) {
  const Schema = useMemo(() => {
    return getFormSchema(props.questions.fields);
  }, [props.questions]);

  const { questions, isSubmission, closeModalOnSuccess, customeStyle } = props;
  const [submitData, setSubmitData] = useState<ISubmitForm>({
    formId: questions.id ?? "",
    fields: [{ fieldId: questions.fields[0]?.id ?? "", value: "" }],
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    submitData.fields[index] = { fieldId: name, value };
    setSubmitData({ ...submitData });
  };

  const { mutate: CreateSubmitForm } = useCreateSubmissionForm({
    onSuccess() {
      closeModalOnSuccess && closeModalOnSuccess();
    },
  });

  const handleFormSubmission = () => {
    setErrors({});
    const result = Schema.safeParse(submitData);

    if (!result.success) {
      setErrors(formatZodErrors(result.error, 1));
      return;
    }
    CreateSubmitForm(submitData);
  };

  return (
    <section className={`bg-primary-50 relative w-full flex justify-center items-center`}>
      {customeStyle ?? (
        <Image className="absolute left-[22rem] top-[10rem" src="/user.png" alt="user" width={300} height={300} />
      )}

      {customeStyle ?? (
        <Image
          className="absolute right-[24rem] top-[20rem]"
          src="/user-group.png"
          alt="user"
          width={300}
          height={300}
        />
      )}

      <div className="w-full max-w-2xl bg-white rounded-lg p-4 z-40">
        <div className="p-2">
          <h1 className="text-2xl font-bold">{questions?.name}</h1>
          <p className="text-black text-sm mt-2">{questions?.description}</p>

          <div className="space-y-5 mt-4">
            <section>
              {questions.fields?.map((item, index) => {
                if (item.type === "drop down") {
                  return (
                    <section className="mt-4">
                      <label className="block text-gray-800">{item.title}</label>
                      <select
                        name={item.id}
                        onChange={(e) => handleChange(e, index)}
                        id=""
                        className="w-full mt-2 p-2 focus:outline-none border border-gray-300 rounded-md"
                      >
                        {item?.options?.map((item) => (
                          <option key={`form_option${item.sort_order}`} value={item.title}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                      {errors[index] && <p className="text-red-500">{errors[index]}</p>}
                    </section>
                  );
                } else {
                  return (
                    <section className="mt-4">
                      <label className="block text-gray-800">{item.title}</label>

                      <input
                        className="w-full p-2 focus:outline-none border border-gray-300 rounded-md"
                        type={item.type}
                        name={item.id}
                        onChange={(e) => handleChange(e, index)}
                        placeholder={item.title}
                      />
                      {errors[index] && <p className="text-red-500">{errors[index]}</p>}
                    </section>
                  );
                }
              })}
            </section>

            <div>
              <Image src="/terms-rec.jpg" alt="terms" className="w-full rounded-md" width={200} height={200} />
            </div>

            {questions.TOS && (
              <>
                <div>
                  <p className="block text-gray-700">Terms and Conditions</p>
                  <p className="text-sm text-gray-500">{questions?.TOS}</p>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">I Accept Terms and Conditions</label>
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                    className="form-checkbox h-4 w-4 text-primary"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleFormSubmission}
              disabled={isSubmission}
              className="w-full text-white py-2 bg-primary rounded-md"
              style={{ backgroundColor: questions.color }}
            >
              {questions?.buttonText || "..."}
            </Button>

            {questions.footerDisclaimer && (
              <p className="text-gray-600 text-center mt-5">{questions?.footerDisclaimer}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
