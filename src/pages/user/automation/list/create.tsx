import { useState } from "react";
import UserLayout from "@/layout/user";
import { useRouter } from "next/router";
import { ICreateAutomationList, PageProps } from "@/typings/interface/automation";
import ListAutomationForm from "@/components/automation/listAutomationform";
import { useParams } from "next/navigation";
import moment from "moment";
import { useCreateAutomationList, useEditAutomation } from "@/providers/hooks/mutate/automation/list";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import defaultValue from "@/core/const/automation/defaultvalue";
import { UserRoutes } from "@/core/const/routes.const";
import UploadBox from "@/components/common/file/uploadBox";
import MessageForm from "@/components/broadcast/messageForm";
import PageHeading from "@/components/common/text/pageHeading";

const tags = [
  { value: " ", title: "tag1" },
  { value: "", title: "tag2" },
  { value: "", title: "tag3" },
];
const tagsCondition = [
  { value: " ", title: "Include" },
  { value: "", title: "Exclude" },
];
export default function CreateAutomationPage(props: PageProps) {
  const [clearFileFlag, setClearFileFlag] = useState<boolean>(false);
  const { id } = useParams() || {};
  const { mutate: editAutomationList } = useEditAutomation(id as string, {
    options: {
      errorConfig: { title: "Failed to Edit Broadcast List" },
      successConfig: { title: "Broadcast List Edited", text: "The broadcast list was successfully edited." },
    },
    onSuccess() {
      router.push("/user/automation");
    },
  });
  const { automationList } = props;
  const [formData, setFormData] = useState<ICreateAutomationList>({
    accountId: automationList?.account.id ?? "",
    broadCastListId: automationList?.broadcast.id ?? "",
    type: automationList?.type ?? "",
    time: automationList?.time ?? "",
    timeZone: automationList?.timeZone ?? "",
    sendDate: automationList?.sendDate ? moment(automationList?.sendDate ?? "").format("YYYY-MM-DD") : "",
    status: automationList?.status ?? "active",
    tagCondition: automationList?.tagCondition ?? "",
    tags: [],
    files: [],
    text: automationList?.text ?? "",
    minutesAfter: automationList?.minutesAfter ?? 0,
    typeValue: 0,
  });
  const isEditing = !!automationList?.id;
  const router = useRouter();
  const { mutate: createAutomationList } = useCreateAutomationList({
    onSuccess() {
      router.push(UserRoutes.LIST_AUTOMATION), setFormData({ ...defaultValue });
      setClearFileFlag(true);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    if (name === "tags") {
      setFormData((prevData) => ({
        ...prevData,
        tags: value.split(",").map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    value != undefined && updateFormState({ name, value });
  };

  const updateFormState = ({ name, value }: { name: string; value: string }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (files: File[]) => {
    formData.files = files;
    setFormData((val) => ({ ...val }));
  };
  const tagsString = formData.tags.join(", ");
  const handleSave = () => {
    isEditing ? editAutomationList({ ...automationList, ...formData }) : createAutomationList(formData);
  };

  return (
    <UserLayout>
      <div>
        <div className="flex flex-row gap-2 border-red-600">
          <Breadcrumb />
        </div>
        <div>
          <PageHeading
            title={isEditing ? "Update List Automation" : "Create List Automations"}
            description={isEditing ? "Update List Automation here" : "Create list automations here"}
            buttonTitle={isEditing ? "Update List Automation" : "Save List Automation"}
            onClick={handleSave}
          />
        </div>
        <section>
          <ListAutomationForm setFormData={setFormData} formData={formData} />
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-[2rem] mt-[2rem] items-center ">
          <div className="mb-10">
            <MessageForm onChange={updateFormState} broadcastType={formData.type} formValue={formData.text} />
          </div>
          <div>
            {formData.type == "default" ? (
              <div className="flex flex-row gap-6  mb-0 mt-[-4rem] ">
                <div className="flex-1">
                  <div className="col-span-1">
                    <div className="text-xs">Tag Condition</div>
                    <select
                      onChange={handleChange}
                      name="tagCondition"
                      className="w-full py-2 px-2  border border-gray-700 rounded focus:outline-none"
                    >
                      <option value="">Select</option>
                      {tagsCondition.map((tags) => (
                        <option key={tags.title} value={tags.title}>
                          {tags.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="col-span-1">
                    <div className="text-xs">Select Tag</div>
                    <select
                      onChange={handleChange}
                      name="tags"
                      value={tagsString}
                      className="w-full py-2 px-2  border border-gray-700 rounded focus:outline-none"
                    >
                      {tags.map((tags) => (
                        <option key={tags.title} value={tags.title}>
                          {tags.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <UploadBox
              multiple
              title="Click to upload your videos or images"
              description="SVG, PNG, JPG or GIF (max 10 files)"
              onFilesSelect={handleFileUpload}
              clearFlag={clearFileFlag}
              updateClearFlag={setClearFileFlag}
            />
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
