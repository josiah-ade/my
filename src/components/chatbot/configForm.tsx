import Select from "@/components/input/selectInput";
import TextInput from "@/components/input/textInput";
import { ChatBotTypes, MatchOptions } from "@/core/const/chat.const";
import { buildDelayOptions, buildPercentageOptions } from "@/core/const/optionsBuilder";
import { AutomationMatchType } from "@/core/enum/automation";
import { useAccountStore } from "@/providers/stores/accountStore";
import { useBroadcastStore } from "@/providers/stores/broadcastStore";
import { ICreateChatBot } from "@/typings/interface/chatbot";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  formData: ICreateChatBot;
  setFormData: Dispatch<SetStateAction<ICreateChatBot>>;
}

const delayOptions = buildDelayOptions();
const percentageOptions = buildPercentageOptions({ start: 20 });

export default function ChatBotConfigForm(props: IProps) {
  const { formData, setFormData } = props;
  const accounts = useAccountStore((state) => state.connectedAccounts);
  const broadcastLists = useBroadcastStore((state) => state.broadcasts);

  const handleChange = (name: keyof ICreateChatBot, value: string) => {
    setFormData((val) => ({ ...val, [name]: value }));
  };

  const updateMessage = (value: string) => {
    const messages = formData.messages;
    messages[0] = { ...messages[0], minutesAfter: parseFloat(value) };
    setFormData((val) => ({ ...val, messages }));
  };

  return (
    <div className="space-y-8">
      <div className="grid px-4 md:px-[2.19rem] py-4 md:py-[1.88rem] bg-gray-75 sm:grid-cols-[repeat(auto-fill,minmax(20.75rem,1fr))] gap-5">
        <Select
          controlField={"id"}
          options={accounts}
          value={formData.accountId}
          label="Account"
          displayField={"phoneNumber"}
          onChange={(value) => handleChange("accountId", value)}
          name="account"
        />
        <Select
          controlField={"value"}
          options={ChatBotTypes}
          label="Type"
          value={formData.type}
          displayField={"label"}
          onChange={(value) => handleChange("type", value)}
          name="type"
        />
        <Select
          controlField={"id"}
          options={broadcastLists}
          label="List"
          value={formData.broadcastId}
          displayField={"listName"}
          hintText="Every number that sends the trigger word will be automatically saved into this list "
          onChange={(value) => handleChange("broadcastId", value)}
          name="list"
        />
      </div>

      <div className="space-y-5 px-4 md:px-[2.19rem] py-4 md:py-[1.88rem]  bg-gray-75">
        <h2 className="text-gray-700 font-semibold text-xl"> Configuration Settings </h2>

        <div className="flex flex-col md:flex-row gap-5">
          <TextInput
            hintText="Words that triggers the bot to respond"
            name="triggerWord"
            type="text"
            className="w-full"
            value={formData.triggerWord}
            label="Trigger Word"
            onChange={(value) => handleChange("triggerWord", value)}
          />
          <div className="w-full md:min-w-[16.13rem] md:w-[20%]">
            <Select
              controlField={"value"}
              options={delayOptions}
              label="Delay"
              value={`${formData.messages[0].minutesAfter}`}
              displayField={"label"}
              onChange={(value) => updateMessage(value)}
              name="delay"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(16.13rem,1fr))] gap-5">
          <Select
            controlField={"value"}
            options={MatchOptions}
            label="Instruction"
            value={formData.matchType}
            displayField={"label"}
            onChange={(value) => handleChange("matchType", value)}
            name="delay"
          />
          {formData.matchType == AutomationMatchType.SIMILAR && (
            <Select
              controlField={"value"}
              options={percentageOptions}
              label="Match Percentage"
              value={`${formData.matchPercentage}`}
              displayField={"label"}
              onChange={(value) => handleChange("matchPercentage", value)}
              name="Match Percentage"
            />
          )}
        </div>
      </div>
    </div>
  );
}
