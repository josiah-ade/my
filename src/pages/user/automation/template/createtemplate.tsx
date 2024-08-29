import MessageBox from "@/components/automation/template/addmessageBox";
import TemplateTextInput from "@/components/automation/template/textinput";
import GroupSelector from "@/components/broadcast/groupSelector";
import PageHeading from "@/components/common/text/pageHeading";
import { DefaultCreateGroupAutomationTemplateData } from "@/core/const/automation/template/form.const";
import UserLayout from "@/layout/user";
import { TemplateMessage } from "@/typings/interface/automation/template";
import { useState } from "react";

export default function CreateAutomationTemplate() {
    const [selectedId, setSelectedId] = useState<string[]>([]);
    const [formData, setFormData] = useState<TemplateMessage>({ ...DefaultCreateGroupAutomationTemplateData })

    const handleSave = () => {
    }
    return (
        <UserLayout>
            <PageHeading title={"Create Group Automation Templates"}
                description={"Create automations templates here"} buttonTitle="Save Automation Template"
                onClick={handleSave} />
            <TemplateTextInput setFormData={setFormData} formData={formData} />
            <div className="flex flex-row gap-5 mt-5 ">
                <div className="w-full flex-grow ">
                <MessageBox setFormData={setFormData} formData={formData} />
                </div>
                <div className=" w-full flex-grow ">
                    <GroupSelector accountId={""}
                        setValue={setSelectedId} />
                </div>
            </div>
        </UserLayout>
    )
}