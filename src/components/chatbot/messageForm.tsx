import MessageForm from "@/components/broadcast/messageForm";
import Button from "@/components/button/button";
import { UploadDel } from "@/core/const/icons/icons";

import { Dispatch, SetStateAction, useEffect } from "react";
import TextInput from "@/components/input/textInput";
import { ICreateChatBot, IChatBotMessage } from "@/typings/interface/chatbot";
import { DefaultChatBotMessage } from "@/core/const/chat.const";
import { ChatBotType } from "@/core/enum/chatbot";
import Select from "../input/selectInput";
import { buildDelayOptions } from "@/core/const/optionsBuilder";

interface IProps {
  formData: ICreateChatBot;
  setFormData: Dispatch<SetStateAction<ICreateChatBot>>;
}
const delayOptions = buildDelayOptions();

export default function ChatBotMessageForm(props: IProps) {
  const { formData, setFormData } = props;

  const handleChange = (index: number, name: keyof IChatBotMessage, value: string) => {
    const messages = formData.messages;
    messages[index] = { ...messages[index], [name]: value };

    setFormData((val) => ({ ...val, messages }));
  };

  const addNewMessage = () => {
    formData.messages.push({ ...DefaultChatBotMessage });
    setFormData({ ...formData });
  };

  const deleteMessage = (index: number) => {
    formData.messages.splice(index, 1);
    setFormData({ ...formData });
  };

  useEffect(() => {
    if (formData.type == ChatBotType.SINGLE) {
      formData.messages = formData.messages.slice(0, 1);
      setFormData({ ...formData });
    }
  }, [formData.type]);

  return (
    <div>
      {formData.messages.map((message, index) => (
        <div className="mb-5" key={index}>
          <MessageForm
            formValue={message.text}
            onChange={({ value }) => handleChange(index, "text", value)}
            broadcastType="group"
          />
          <div className="text-right">
            {formData.messages.length > 1 && (
              <button
                className="border-error py-1 px-3 rounded-lg text-sm border inline-flex items-center gap-2 font-semibold text-error"
                onClick={() => deleteMessage(index)}
              >
                <UploadDel />
                Delete Message
              </button>
            )}
          </div>
          {index >= 1 && (
            <Select
              controlField={"value"}
              options={delayOptions}
              label="Send Next message after"
              value={`${message.minutesAfter}`}
              displayField={"label"}
              onChange={(value) => handleChange(index, "minutesAfter", value)}
              name="delay"
            />
          )}
        </div>
      ))}

      {formData.type == ChatBotType.MULTIPLE && (
        <Button
          className="border-primary- border w-full font-semibold mt-5 md:mt-10 text-primary"
          onClick={addNewMessage}
        >
          Add Next Message
        </Button>
      )}
    </div>
  );
}
