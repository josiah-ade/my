import MessageForm from "@/components/broadcast/messageForm";
import Button from "@/components/button/button";
import { UploadDel } from "@/core/const/icons/icons";

import { DefaultCreateGroupAutomationMessage } from "@/core/const/automation/group/form.const";
import { ICreateGroupAutomation, ICreateGroupAutomationMessage } from "@/typings/interface/automation/group";
import { Dispatch, SetStateAction } from "react";
import TextInput from "@/components/input/textInput";
import { GroupAutomationType } from "@/core/enum/automation";
import Select from "@/components/input/selectInput";
import { TimeZones } from "@/core/const/automation/timezone";

interface IProps {
  formData: ICreateGroupAutomation;
  setFormData: Dispatch<SetStateAction<ICreateGroupAutomation>>;
}

export default function GroupAutomationMessageForm(props: IProps) {
  const { formData, setFormData } = props;

  const handleChange = (index: number, name: keyof ICreateGroupAutomationMessage, value: string) => {
    const messages = formData.messages;
    messages[index] = { ...messages[index], [name]: value };

    setFormData((val) => ({ ...val, messages }));
  };

  const addNewMessage = () => {
    formData.messages.push({ ...DefaultCreateGroupAutomationMessage });
    setFormData({ ...formData });
  };

  const deleteMessage = (index: number) => {
    formData.messages.splice(index, 1);
    setFormData({ ...formData });
  };

  return (
    <div>
      {formData.messages.map((message, index) => (
        <div className="mb-5" key={index}>
          {formData.type == GroupAutomationType.DATE && (
            <div className="grid mb-5 gap-4 sm:grid-cols-2">
              <TextInput
                name="sendDate"
                type="date"
                label="Start Date"
                value={message.startDate}
                onChange={(value) => handleChange(index, "startDate", value)}
              />
              <TextInput
                name="startDate"
                type="date"
                label="End Date"
                value={message.endDate}
                onChange={(value) => handleChange(index, "endDate", value)}
              />
              <TextInput
                name="time"
                type="time"
                label="Time"
                value={message.time}
                onChange={(value) => handleChange(index, "time", value)}
              />
              <Select
                controlField={"value"}
                options={TimeZones}
                label="Timezone"
                displayField={"label"}
                value={message.timeZone}
                onChange={(value) => handleChange(index, "timeZone", value)}
                name="Time Zone"
              />
            </div>
          )}
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
          {formData.type == GroupAutomationType.WORD && (
            <TextInput
              name="minutesAfter"
              type="number"
              label="Minutes before next Message"
              value={`${message.minutesAfter ?? ""}`}
              onChange={(value) => handleChange(index, "minutesAfter", value)}
            />
          )}
        </div>
      ))}

      <Button
        className="border-primary- border w-full font-semibold mt-5 md:mt-10 text-primary"
        onClick={addNewMessage}
      >
        Add Next Message
      </Button>
    </div>
  );
}
