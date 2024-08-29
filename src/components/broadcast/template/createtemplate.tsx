import MessageForm from "@/components/broadcast/messageForm";
import Button from "@/components/button/button";
import UploadBox from "@/components/common/file/uploadBox";
import TextInput from "@/components/input/textInput";
import { useCreateBroadCastTemplateList, useEditBroadcastTemplateList } from "@/providers/hooks/mutate/templates";
import { ICreateTemplate, ITemplate } from "@/typings/interface/templates";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const defaultvalue: ICreateTemplate = {
    name: "",
    text: "",
    files: []
};
interface IProps {
    activeTemplate?: ITemplate,
    setActiveTemplate: Dispatch<SetStateAction<ITemplate | undefined>>,
}
export default function CreateBroadCastTemplates(props: IProps) {
    const { activeTemplate, setActiveTemplate } = props
    const templateId = activeTemplate?.id
    const { mutate: editTemplate } = useEditBroadcastTemplateList(templateId as string, {
        options: {
            errorConfig: { title: "Failed to Edit Broadcast List" },
            successConfig: { title: "Broadcast List Edited", text: "The broadcast list was successfully edited." },
        },
        onSuccess() {
            setUserData({ ...defaultvalue });
        },
    });
    const { mutate: templateList } = useCreateBroadCastTemplateList({
        options: {
            errorConfig: { title: "Failed to Edit Broadcast List" },
            successConfig: { title: "Broadcast List Edited", text: "The broadcast list was successfully edited." },
        },
        onSuccess() {
            setUserData({ ...defaultvalue });
        },
    });
    const [clearFileFlag, setClearFileFlag] = useState<boolean>(false);
    const [userData, setUserData] = useState<ICreateTemplate>({
        name: activeTemplate?.name ?? "",
        text: activeTemplate?.text ?? "",
        files: []
    });
    useEffect(() => {
        setUserData({
            name: activeTemplate?.name ?? "",
            text: activeTemplate?.text ?? "",
            files: []
        })
    }, [activeTemplate])
    
    const isEditing = !!activeTemplate?.id;
    const handleChange = (name: keyof ICreateTemplate, value: string) => {
        setUserData({ ...userData, [name]: value });
    }

    const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        isEditing ? editTemplate({ ...userData }) : templateList(userData);;
    };
    const handleFileUpload = (files: File[]) => {
        userData.files = files;
        setUserData((val) => ({ ...val }));
    };
    const handleCancel = () => {
        setActiveTemplate(undefined)
    }
    return (
        <form onSubmit={handleSave}>
            <section className="grid grid-cols-1 gap-[2rem]">
                <div>
                    <TextInput name={"name"}
                        value={userData.name}
                        label="Template Name"
                        onChange={(value) => handleChange("name", value)}
                        placeholder={"Enter Name"}
                        inputClass="p-1"
                    />
                    <div className="mt-5">
                        <MessageForm   onChange={({ value }) => handleChange("text", value)} formValue={userData.text} broadcastType={""} />
                    </div>
                    <div className="mt-10">
                        <UploadBox
                            multiple
                            title="Click to upload your videos or images"
                            description="SVG, PNG, JPG or GIF (max 10 files)"
                            onFilesSelect={handleFileUpload}
                            clearFlag={clearFileFlag}
                            updateClearFlag={setClearFileFlag}
                        />
                    </div>
                </div>
            </section>
            <div>
                {isEditing &&
                    <Button onClick={handleCancel} className="mb-4 border w-full border-primary ">Cancel</Button>}
                <Button disabled={!userData.name.length} type="submit" className="bg-primary text-white text-center text-sm w-full">
                    {isEditing ? "Update Template" : " Save Template"}
                </Button>
            </div>
        </form>
    );
}
