import Select from "@/components/input/selectInput";
import TextInput from "@/components/input/textInput";
import { GroupAutomationTypes } from "@/core/const/automation/group/types.const";
import { GroupAutomationType } from "@/core/enum/automation";
import { useAccountStore } from "@/providers/stores/accountStore";
import { ICreateGroupAutomation } from "@/typings/interface/automation/group";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  formData: ICreateGroupAutomation;
  setFormData: Dispatch<SetStateAction<ICreateGroupAutomation>>;
}

export default function GroupAutomationConfigForm(props: IProps) {
  const { formData, setFormData } = props
  const accounts = useAccountStore((state) => state.connectedAccounts);

  const handleChange = (name: keyof ICreateGroupAutomation, value: string) => {
    setFormData((val) => ({ ...val, [name]: value }));
  };

  return (
    <div className="px-4 md:px-[2.19rem] py-4 md:py-[1.88rem] bg-gray-75">
      <div className="grid sm:grid-cols-[repeat(auto-fill,minmax(20.75rem,1fr))] gap-5">
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
          options={GroupAutomationTypes}
          label="Type"
          value={formData.type}
          displayField={"label"}
          onChange={(value) => handleChange("type", value)}
          name="type"
        />
        
      </div>
      {formData.type == GroupAutomationType.WORD && (
        <div className="mt-5">
          <TextInput
            hintText="words that would be sent to trigger this automation"
            name="triggerWord"
            type="text"
            value={formData.triggerWord}
            label="Word Triggers"
            onChange={(value) => handleChange("triggerWord", value)}
          />
        </div>
      )}
    </div>
  );
}
