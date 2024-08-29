import MessageForm from "@/components/broadcast/messageForm";
import Button from "@/components/button/button";
import UploadBox from "@/components/common/file/uploadBox";
import Select from "@/components/input/selectInput";
import { buildDelayOptions } from "@/core/const/optionsBuilder";
import { TemplateMessage } from "@/typings/interface/automation/template";
import { Dispatch, SetStateAction } from "react";

interface IProps {
    formData?: TemplateMessage;
    setFormData: Dispatch<SetStateAction<TemplateMessage>>;
}
const delayOptions = buildDelayOptions();
export default function MessageBox(props: IProps) {
    const { formData, setFormData } = props

    const handleChange = (name: keyof TemplateMessage, value: string) => {
        setFormData((val) => ({ ...val, [name]: value }));
    };
    const updateMessage = (value: string) => {
        const messages = formData?.message;
        // messages[0] = { ...messages[0], minutesAfter: parseFloat(value) };
        setFormData((val) => ({ ...val, messages }));
      };
    
    return (
        <div className="">
            <div>
                <MessageForm
                    onChange={({ value }) => handleChange("message", value)}
                     broadcastType="group"
                     formValue={""} />
                <div className="">
                    <UploadBox
                        title="Click to upload your videos or images"
                        description="SVG, PNG, JPG or GIF (max 10 files)"
                        onFilesSelect={function (files: File[]): void {
                            throw new Error("Function not implemented.");
                        }} />
                        <Select
                            controlField={"value"}
                            options={delayOptions}
                            label="Send Next message after"
                            value={""}
                            displayField={"label"}
                            onChange={(value) => updateMessage(value)}
                            name="nextMessage"
                        />
                    </div>
            </div>
            <Button
                className="border-primary border w-full font-semibold mt-5 md:mt-10 text-primary">
                Add Next Message
            </Button>
        </div>)
}