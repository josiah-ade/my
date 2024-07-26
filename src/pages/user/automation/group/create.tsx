import UserLayout from "@/layout/user";
import PageHeading from "@/components/common/subheadings";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import GroupAutomationConfigForm from "@/components/automation/group/configForm";
import { ICreateGroupAutomation } from "@/typings/interface/automation/group";
import { useEffect, useState } from "react";
import {
  DefaultCreateGroupAutomationData,
  DefaultCreateGroupAutomationMessage,
} from "@/core/const/automation/group/form.const";
import GroupSelector from "@/components/broadcast/groupSelector";
import GroupAutomationMessageForm from "@/components/automation/group/messageForm";
import { useCreateGroupAutomation, useEditGroupAutomation } from "@/providers/hooks/mutate/automation/group";
import { IQueryOptions } from "@/typings/query";

interface IProps {
  defaultData?: ICreateGroupAutomation;
}

function getMutationOption(isEditing = false): IQueryOptions {
  return {
    successConfig: {
      title: `Group Automation ${isEditing ? "Updated" : "Created"}`,
      text: `The group automation has been successfully ${isEditing ? "updated" : "created"}.`,
    },
    errorConfig: { title: `Failed to ${isEditing ? "update" : "create"} Group Automation` },
  };
}
export default function CreateGroupAutomation(props: IProps) {
  const [formData, setFormData] = useState<ICreateGroupAutomation>({ ...DefaultCreateGroupAutomationData });
  const [selectedGroups, setSelectedGroup] = useState<string[]>([]);
  const [clearFlag, setClearFlag] = useState(false);
  const isEditing = !!formData.id;

  const { mutate: createGroupAutomation } = useCreateGroupAutomation({
    onSuccess: () => {
      setFormData({ ...DefaultCreateGroupAutomationData, messages: [{ ...DefaultCreateGroupAutomationMessage }] });
      setClearFlag(true);
    },
    options: getMutationOption(),
  });

  const { mutate: updateGroupAutomation } = useEditGroupAutomation({
    onSuccess: () => {
      setFormData({ ...DefaultCreateGroupAutomationData, messages: [{ ...DefaultCreateGroupAutomationMessage }] });
      setClearFlag(true);
    },
    options: getMutationOption(isEditing),
  });

  useEffect(() => {
    setFormData((val) => ({ ...val, groups: selectedGroups }));
  }, [selectedGroups]);

  useEffect(() => {
    props.defaultData && setFormData({ ...props.defaultData });
  }, [props.defaultData]);

  const handleSubmit = () => {
    const isEditing = !!formData.id;
    isEditing ? updateGroupAutomation(formData) : createGroupAutomation(formData);
  };

  return (
    <div>
      <Breadcrumb />
      <div>
        <PageHeading
          title={`${isEditing ? "Edit" : "Create"} Group Automations`}
          description={`${isEditing ? "Edit" : "Create"} group automations here`}
          hideIcon={true}
          buttonTitle={`${isEditing ? "Update" : "Save"} Group Automation`}
          titleClass="text-2xl"
          onClick={handleSubmit}
        />
      </div>

      <GroupAutomationConfigForm formData={formData} setFormData={setFormData} />

      <section className=" mt-[1.88rem] flex gap-7 md:gap-10 flex-col-reverse md:flex-row">
        <form className="flex-grow w-full">
          <GroupAutomationMessageForm formData={formData} setFormData={setFormData} />
        </form>
        <div className="flex-grow md:pt-3 w-full">
          <GroupSelector
            clearFlag={clearFlag}
            defaultValue={props.defaultData?.groups}
            updateClearFlag={setClearFlag}
            width="w-full"
            accountId={formData.accountId}
            setValue={setSelectedGroup}
          />
        </div>
      </section>
    </div>
  );
}

CreateGroupAutomation.Layout = UserLayout;
