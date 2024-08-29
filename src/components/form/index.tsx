import React, { useEffect, useState } from "react";
import UserLayout from "@/layout/user";
import FormConfiguration from "@/components/form/formconfiguration";
import Modal from "@/components/modal/modal";
import { ArrowRight } from "@/core/const/icons/icons";
import Button from "@/components/button/button";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import FormDetails from "@/components/form/formdetails";
import useNotificationStore from "@/providers/stores/notificationStore";
import { NotificationType } from "@/core/enum/notification";
import { useCreateForm, useEditForm } from "@/providers/hooks/mutate/createForm";
import { ICreateForm } from "@/typings/interface/form";
import PreviewForm from "./previewForm";
import { DEFAULT_FORM_VALUE } from "@/core/const/form";
import { VscEye } from "react-icons/vsc";
import { useRouter } from "next/router";
import { UserRoutes } from "@/core/const/routes.const";

interface IProps {
  formDetails?: ICreateForm;
  isEdit?: ConstrainBoolean;
}

export default function CreateFormComp(props: IProps) {
  const { formDetails } = props;
  const [questions, setQuestions] = useState<ICreateForm>({ ...DEFAULT_FORM_VALUE });
  const [activeTab, setActiveTab] = useState<"details" | "configuration">("details");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const setNotification = useNotificationStore((state) => state.setDisplay);

  const isEdit = !!formDetails?.id;

  useEffect(() => {
    if (formDetails) setQuestions({ ...formDetails });
  }, [formDetails]);

  const { mutate: createForm } = useCreateForm({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: { title: "Form Created Successfully", text: `Your form has been created successfully.` },
      });
      setQuestions({ ...DEFAULT_FORM_VALUE });
      router.push(UserRoutes.FORM);
    },
  });

  const { mutate: EditForm } = useEditForm({
    onSuccess() {
      setNotification(true, {
        type: NotificationType.success,
        content: { title: "Form Updated", text: `Your form has been updated successfully.` },
      });
      setQuestions({ ...DEFAULT_FORM_VALUE });
      router.push(UserRoutes.FORM);
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePreviewForm = () => {
    openModal();
  };

  const handleSaveForm = () => {
    if (activeTab == "details") {
      setActiveTab("configuration");
    } else if (activeTab == "configuration") {
      isEdit ? EditForm(questions) : createForm(questions);
    }
  };
  return (
    <UserLayout>
      <Breadcrumb />
      <div className=" mt-8 p-0 lg:px-6">
        <div className="grid  lg:grid-cols-2 items-center gap-y-4 mb-8 justify-items-end xl:grid-cols-4 ">
          <div className=" md:col-span-2 xl:col-span-1 justify-self-start ">
            <h1 className="text-2xl font-bold">{isEdit ? "Edit Form" : "Create Form"}</h1>
            <p className="text-gray-600 text[0.9rem]">{isEdit ? "Edit" : "Create"} your forms here</p>
          </div>

          <div className=" justify-self-start xl:justify-self-center xl:col-span-2 ">
            <section className="flex items-center text-sm gap-0.5 max-sm:flex-wrap">
              <button className="flex items-center space-x-2" onClick={() => setActiveTab("details")}>
                <span
                  className={`h-7 w-7 p-2 flex items-center text-xs justify-center ${
                    activeTab === "details" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  }   rounded-full`}
                >
                  1
                </span>
                <span
                  className={`${activeTab === "details" ? "text-gray-800 font-bold" : "text-gray-500"} text-nowrap`}
                >
                  Form Details
                </span>
              </button>
              <div>
                <ArrowRight color={`${activeTab === "configuration" ? "text-primary" : ""}`} />
              </div>
              <button className="flex items-center space-x-2" onClick={() => setActiveTab("configuration")}>
                <span
                  className={`h-7 w-7 p-2 flex items-center text-xs justify-center ${
                    activeTab === "configuration" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
                  }   rounded-full`}
                >
                  2
                </span>
                <span
                  className={`${
                    activeTab === "configuration" ? "text-gray-800 font-bold" : "text-gray-500"
                  } text-nowrap`}
                >
                  Form Configuration
                </span>
              </button>
            </section>
          </div>

          <div className="flex max-sm:flex-wrap max-md:w-full max-md:justify-between items-center gap-2">
            <Button
              className="flex items-center space-x-2  max-sm:flex-grow px-4 text-gray-700 py-2 font-semibold text-sm border rounded-md"
              onClick={() => handlePreviewForm()}
            >
              <VscEye />
              <span className="text-nowrap">Preview Form</span>
            </Button>
            <Button
              primary
              className="text-white max-sm:flex-grow  px-4 py-2 text-sm rounded-md"
              onClick={() => handleSaveForm()}
            >
              {activeTab && activeTab === "details" ? "Proceed" : "Save Form"}
            </Button>
          </div>
        </div>

        {activeTab === "details" && <FormDetails setQuestions={setQuestions} questions={questions} />}
        {activeTab === "configuration" && <FormConfiguration setQuestions={setQuestions} questions={questions} />}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <PreviewForm customeStyle={true} questions={questions} isSubmission={true} />
      </Modal>
    </UserLayout>
  );
}
