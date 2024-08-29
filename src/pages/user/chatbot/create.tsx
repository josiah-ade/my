import UserLayout from "@/layout/user";
import PageHeading from "@/components/common/text/pageHeading";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import { useEffect, useState } from "react";
import { IQueryOptions } from "@/typings/query";
import { useRouter } from "next/router";
import { UserRoutes } from "@/core/const/routes.const";
import { ICreateChatBot } from "@/typings/interface/chatbot";
import { DefaultChatBotData } from "@/core/const/chat.const";
import { useCreateChatBot, useEditChatBot } from "@/providers/hooks/mutate/chatbot";
import ChatBotMessageForm from "@/components/chatbot/messageForm";
import ChatBotConfigForm from "@/components/chatbot/configForm";
import UploadBox from "@/components/common/file/uploadBox";

interface IProps {
  defaultData?: ICreateChatBot;
}

function getMutationOption(isEditing = false): IQueryOptions {
  return {
    successConfig: {
      title: `Chatbot ${isEditing ? "Updated" : "Created"}`,
      text: `The chatbot has been successfully ${isEditing ? "updated" : "created"}.`,
    },
    errorConfig: { title: `Failed to ${isEditing ? "update" : "create"} Chatbot` },
  };
}

export default function CreateChatBotPage(props: IProps) {
  const [formData, setFormData] = useState<ICreateChatBot>({ ...DefaultChatBotData });
  const [clearFlag, setClearFlag] = useState(false);
  const isEditing = !!formData.id;
  const router = useRouter();

  const { mutate: createChatBot } = useCreateChatBot({
    onSuccess: () => {
      setFormData({ ...DefaultChatBotData });
      setClearFlag(true);
      router.push(UserRoutes.CHAT_BOT);
    },
    options: getMutationOption(),
  });

  const { mutate: updateChatBot } = useEditChatBot(formData.id ?? "", {
    onSuccess: () => {
      setFormData({ ...DefaultChatBotData });
      setClearFlag(true);
      router.push(UserRoutes.CHAT_BOT);
    },
    options: getMutationOption(isEditing),
  });

  useEffect(() => {
    props.defaultData && setFormData({ ...props.defaultData });
  }, [props.defaultData]);

  const handleFileUpload = (files: File[]) => {
    // formData.files = files;
    // setFormData((val) => ({ ...val }));
  };

  const handleSubmit = () => {
    isEditing ? updateChatBot(formData) : createChatBot(formData);
  };

  return (
    <div>
      <Breadcrumb />
      <div>
        <PageHeading
          title={`${isEditing ? "Edit" : "Create"} Chatbot`}
          description={`${isEditing ? "Edit" : "Create"} chatbot here`}
          hideIcon={true}
          buttonTitle={`${isEditing ? "Update" : "Save"} Chatbot`}
          titleClass="text-2xl"
          onClick={handleSubmit}
        />
      </div>

      <ChatBotConfigForm formData={formData} setFormData={setFormData} />

      <section className=" mt-[1.88rem] flex gap-7 md:gap-10 flex-col-reverse md:flex-row">
        <form className="flex-grow w-full">
          <ChatBotMessageForm formData={formData} setFormData={setFormData} />
        </form>
        <div className="flex-grow md:pt-3 w-full">
          <UploadBox
            multiple
            title="Click to upload your videos or images"
            description="SVG, PNG, JPG or GIF (max 10 files)"
            onFilesSelect={handleFileUpload}
            // clearFlag={clearFileFlag}
            // updateClearFlag={setClearFileFlag}
          />
        </div>
      </section>
    </div>
  );
}

CreateChatBotPage.Layout = UserLayout;
