import Select from "@/components/input/selectInput";
import TextInput from "@/components/input/textInput";
import { AutomationTemplateTypes } from "@/core/const/automation/template/templateautomationtypeoption";
import { AutomationTemplateMatchType } from "@/core/enum/automation";
import { useAccountStore } from "@/providers/stores/accountStore";
import { TemplateMessage } from "@/typings/interface/automation/template";
import { Dispatch, SetStateAction } from "react";
interface IProps {
    formData?: TemplateMessage;
    setFormData: Dispatch<SetStateAction<TemplateMessage>>;
}
export default function TemplateTextInput(props: IProps) {
    const accounts = useAccountStore((state) => state.connectedAccounts);
    const { formData, setFormData } = props

    const handleChange = (name: keyof TemplateMessage, value: string) => {
        setFormData((val) => ({ ...val, [name]: value }));    };
    return (
        <div className="grid grid-cols-1 md:grid-cols-3  gap-6 bg-gray-50 py-5 px-5">
            <Select
                onChange={(value) => handleChange("accountId", value)}
                name={"accountId"}
                value={formData?.accountId}
                options={accounts}
                displayField={"phoneNumber"}
                label="Account"
                controlField={"id"} />
            <TextInput name={"templateName"}
                value={formData?.templateName}
                onChange={(value) => handleChange("templateName", value)}
                label="Template Name"
                placeholder="template name"
            />
            <Select
                controlField={"value"}
                options={AutomationTemplateTypes}
                label="Type"
                value={formData?.type}
                displayField={"label"}
                name="type"
                onChange={(value) => handleChange("type", value)}
            />
            {formData?.type == AutomationTemplateMatchType.TIME &&
                <>
                    <TextInput name={"startDate"}
                        value={formData?.startDate}
                        onChange={(value) => handleChange("startDate", value)}
                        type="date"
                        label="Start - End Date"
                        placeholder="Active" />
                    <Select name={"time"}
                        value={formData?.time}
                        onChange={(value)=>handleChange("time", value)}
                        options={[]}
                        controlField={""}
                        displayField={""}
                        label="Time" />
                    <Select name={"timeZone"}
                        value={formData?.timeZone}
                        onChange={(value)=>handleChange("timeZone", value)}
                        options={[]}
                        controlField={""}
                        displayField={""}
                        label="Timezone" />
                </>}
            {formData?.type == AutomationTemplateMatchType.Word && <>
                <TextInput name={"wordTrigger"}
                    value={formData?.wordTrigger}
                    onChange={(value)=>handleChange("wordTrigger", value)}
                    type="text"
                    label="Word Triggers"
                    placeholder="5 minutes"
                    className="w-full" />
            </>}

        </div>
    )
}